package community.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import community.auth.dto.AuthDto;
import community.auth.jwt.JwtTokenizer;
import community.auth.refreshtoken.RefreshToken;
import community.auth.refreshtoken.RefreshTokenRepository;
import community.member.entity.Member;
import lombok.SneakyThrows;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    private final RedisTemplate<String, String> redisTemplate;
    private final RefreshTokenRepository refreshTokenRepository;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtTokenizer jwtTokenizer,
                                   RedisTemplate<String, String> redisTemplate,
                                   RefreshTokenRepository refreshTokenRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper objectMapper = new ObjectMapper();
        AuthDto.Login loginDto = objectMapper.readValue(request.getInputStream(), AuthDto.Login.class);


        /* 테스트 할 때 안되면 확인하기 */
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        Member member = (Member) authResult.getPrincipal();

        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        /*리프레쉬 토큰 저장*/
        RefreshToken savedRefreshToken = new RefreshToken();
        savedRefreshToken.setRefreshToken(refreshToken);
        refreshTokenRepository.save(savedRefreshToken);

        redisTemplate.opsForValue().set(
                member.getEmail(),
                refreshToken,
                jwtTokenizer.getRefreshTokenExpirationMinutes(),
                TimeUnit.MINUTES
        );

        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date tokenExpiration =
                jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken
                = jwtTokenizer.generateAccessToken(claims, subject, tokenExpiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date tokenExpiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey =
                jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken =
                jwtTokenizer.generateRefreshToken(subject, tokenExpiration, base64EncodedSecretKey);

        System.out.println("tokenExpiration.getTime() = " + tokenExpiration.getTime());

        redisTemplate.opsForValue().set(
                member.getEmail(),
                refreshToken,
                jwtTokenizer.getRefreshTokenExpirationMinutes(),
                TimeUnit.MINUTES
        );

        return refreshToken;
    }
}

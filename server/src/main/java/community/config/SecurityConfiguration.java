package community.config;

import community.auth.filter.JwtAuthenticationFilter;
import community.auth.filter.JwtLogoutFilter;
import community.auth.filter.JwtVerificationFilter;
import community.auth.handler.*;
import community.auth.jwt.JwtTokenizer;
import community.auth.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

import java.security.Security;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RedisTemplate<String, String> redisTemplate;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .logout().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        //????????????
                                        .antMatchers(HttpMethod.POST, "/members").permitAll()
                                        //????????????,??????,??????
                                        .antMatchers("/members/{member-id:[\\d]+}/**").hasRole("USER")
                                        //????????????
                                        .antMatchers(HttpMethod.GET, "/boards/*").permitAll()
                                        //????????????
                                        .antMatchers(HttpMethod.POST, "/boards").hasRole("USER")
                                        //?????? ?????? ??????
                                        .antMatchers(HttpMethod.DELETE, "/boards").hasRole("ADMIN")
                                        //?????? ??????/ ????????? / ?????? /??????
                                        .antMatchers("/boards/{board-id:[\\d]+}/*").hasRole("USER")
                                        //?????? ??????
                                        .antMatchers(HttpMethod.GET, "comments/*").permitAll()
                                        //?????? ??????
                                        .antMatchers(HttpMethod.POST, "comments").hasRole("USER")
                                        //?????? ?????? ????????? ?????? ??????
                                        .antMatchers("/comments/{comment-id:[\\d]+}/*").hasRole("USER")
                                        .anyRequest().permitAll()
                );
        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration=new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST","DELETE","PATCH"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.addExposedHeader("Authorization");
        corsConfiguration.addExposedHeader("Refresh");

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource=new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource
                .registerCorsConfiguration("/**", corsConfiguration);

        return urlBasedCorsConfigurationSource;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager=builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter=
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisTemplate);

            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter=new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisTemplate);

            JwtLogoutFilter jwtLogoutFilter=
                    new JwtLogoutFilter(
                            new MemberLogoutSuccessHandler(),
                            new MemberLogoutHandler(jwtTokenizer, redisTemplate));

            jwtLogoutFilter.setFilterProcessesUrl("/members/logout");

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtLogoutFilter, JwtLogoutFilter.class);

        }
    }
}

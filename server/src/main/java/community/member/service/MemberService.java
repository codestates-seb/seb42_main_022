package community.member.service;

import community.auth.jwt.JwtTokenizer;
import community.auth.utils.CustomAuthorityUtils;
import community.exception.BusinessLogicException;
import community.exception.ExceptionCode;
import community.member.entity.Member;
import community.member.repository.MemberRepository;
import community.utils.CustomBeanUtils;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@ToString
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final CustomBeanUtils customBeanUtils;

    private final CustomAuthorityUtils authorityUtils;

    private final JwtTokenizer jwtTokenizer;

    private final PasswordEncoder passwordEncoder;


    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());

        String password=member.getPassword();
        String encryptedPassword=passwordEncoder.encode(password);
        member.setPassword(encryptedPassword);
        List<String> roles=authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member){
        Member findMember = findVerifiedMember(member.getMemberId());

        Member updatedMember = (Member) customBeanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatedMember);
    }

    public void deleteMember(long memberId){
        Member findMember=findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember=
                memberRepository.findById(memberId);
        Member findMember=
                optionalMember.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public Member findVerifiedEmail(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        return findMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member= memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);

    }
}
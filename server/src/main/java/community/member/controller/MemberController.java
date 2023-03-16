package community.member.controller;

import community.globaldto.SingleResponseDto;
import community.member.dto.MemberDto;
import community.member.entity.Member;
import community.member.mapper.MemberMapper;
import community.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RequestMapping("/members")
@RestController
@Validated
@ToString
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody){
        System.out.println(requestBody.toString());
        Member member=mapper.memberPostToMember(requestBody);
        System.out.println(member.toString());
        Member createdMember=memberService.createMember(member);
        System.out.println(createdMember.toString());
        return new ResponseEntity<>(new SingleResponseDto<>(mapper.memberToMemberResponse(createdMember)), HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody){

        Member member=mapper.memberPatchToMember(requestBody);
        member.setMemberId(memberId);
        Member updatedMember=memberService.updateMember(member);
        MemberDto.Response response= mapper.memberToMemberResponse(updatedMember);

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId){
        Member member=memberService.findMember(memberId);

        return new ResponseEntity<>(
                mapper.memberToMemberResponse(member),HttpStatus.OK
        );
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

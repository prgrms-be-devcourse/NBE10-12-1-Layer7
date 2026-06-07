package com.back.domain.member.controller;

import com.back.domain.member.entity.Member;
import com.back.domain.member.service.MemberService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class ApiV1MemberController {

    private final MemberService memberService;

    record JoinReqBody(
            @NotBlank @Email String email,
            @NotBlank String password,
            @NotBlank String address,
            @NotBlank String postalCode
    ) {}

    record LoginReqBody(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}

    // 회원가입
    @PostMapping("/join")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public RsData<Void> join(@Valid @RequestBody JoinReqBody body) {
        memberService.join(body.email(), body.password(), body.address(), body.postalCode());
        return new RsData<>("201-1", "%s님 환영합니다. 회원가입이 완료되었습니다.".formatted(body.email()), null);
    }

    // 로그인
    @PostMapping("/login")
    @Transactional(readOnly = true)
    public RsData<Long> login(@Valid @RequestBody LoginReqBody body) {
        return memberService.login(body.email(), body.password())
                .map(m -> new RsData<>("200-1", "로그인 성공", m.getId()))
                .orElse(new RsData<>("401-1", "이메일 또는 비밀번호가 올바르지 않습니다.", null));
    }

    // 내 정보
    @GetMapping("/me")
    @Transactional(readOnly = true)
    public RsData<MemberDto> me(@RequestParam Long actorId) {
        Member member = memberService.findById(actorId);
        return new RsData<>("200-1", "내 정보 조회 성공", new MemberDto(member));
    }
}
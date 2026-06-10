package com.back.domain.member.controller;

import com.back.domain.member.dto.MemberDto;
import com.back.domain.member.service.MemberService;
import com.back.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/members")
@RequiredArgsConstructor
public class ApiV1AdminMemberController {

    private final MemberService memberService;

    // 전체 회원 목록 조회
    @GetMapping
    @Transactional(readOnly = true)
    public RsData<List<MemberDto>> getAll() {
        List<MemberDto> members = memberService.findAll()
                .stream()
                .map(MemberDto::new)
                .toList();
        return new RsData<>("200-1", "전체 회원 조회 성공", members);
    }
}
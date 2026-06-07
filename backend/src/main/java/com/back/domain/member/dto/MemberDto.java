package com.back.domain.member.dto;

import com.back.domain.member.entity.Member;

public record MemberDto(
        Long id,
        String email,
        String address,
        String postalCode
) {
    public MemberDto(Member member) {
        this(
                member.getId(),
                member.getEmail(),
                member.getAddress(),
                member.getPostalCode()
        );
    }
}
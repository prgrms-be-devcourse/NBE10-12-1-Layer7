package com.back.domain.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record MemberJoinReqBody(
        @NotBlank @Email String email,
        @NotBlank String password,
        @NotBlank String address,
        @NotBlank String postalCode
) {}
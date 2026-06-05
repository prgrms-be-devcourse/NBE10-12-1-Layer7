package com.back.domain.receipt.dto;

import jakarta.validation.constraints.NotBlank;

public record ReceiptStatusReqBody(
        @NotBlank String status
) {}
package com.back.domain.receipt.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record ReceiptCreateReqBody(
        @NotNull List<Long> productIds,
        @NotBlank String email,
        @NotBlank String address,
        @NotBlank String postalCode
) {}
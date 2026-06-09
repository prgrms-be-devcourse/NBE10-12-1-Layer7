package com.back.domain.receipt.dto;

import com.back.domain.receipt.entity.ReceiptStatus;
import jakarta.validation.constraints.NotNull;

public record ReceiptStatusReqBody(
        @NotNull ReceiptStatus status
) {}
package com.back.domain.receipt.dto;

import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptStatus;

import java.util.List;

public record ReceiptDto(
        Long receiptId,
        String email,
        String address,
        String postalCode,
        String deliveryDate,
        ReceiptStatus status,
        int totalPrice,
        List<ReceiptItemDto> items
) {
    public ReceiptDto(Receipt receipt) {
        this(
                receipt.getId(),
                receipt.getMember().getEmail(),
                receipt.getMember().getAddress(),
                receipt.getMember().getPostalCode(),
                receipt.getDeliveryDate().toString(),
                receipt.getStatus(),
                receipt.getTotalPrice(),
                receipt.getReceiptItems()
                        .stream()
                        .map(ReceiptItemDto::new)
                        .toList()
        );
    }
}
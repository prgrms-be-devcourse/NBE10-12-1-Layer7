package com.back.domain.receipt.dto;

import com.back.domain.receipt.entity.ReceiptItem;

public record ReceiptItemDto(
        Long productId,
        String name,
        int quantity,
        int price
) {
    public ReceiptItemDto(ReceiptItem item) {
        this(
                item.getProduct().getId(),
                item.getProduct().getBeanName(),
                item.getQuantity(),
                item.getPrice()
        );
    }
}
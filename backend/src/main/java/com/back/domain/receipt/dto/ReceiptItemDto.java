package com.back.domain.receipt.dto;

import com.back.domain.receipt.entity.ReceiptItem;

public record ReceiptItemDto(
        Long productId,
        int quantity,
        int price
) {
    public ReceiptItemDto(ReceiptItem item) {
        this(
                item.getProductId(),
                item.getQuantity(),
                item.getPrice()
        );
    }
}
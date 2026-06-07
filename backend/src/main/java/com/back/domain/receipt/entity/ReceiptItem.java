package com.back.domain.receipt.entity;

import com.back.global.jpa.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
public class ReceiptItem extends BaseEntity {

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receipt_id", nullable = false)
    @JsonIgnore
    private Receipt receipt;

    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int price;

    public ReceiptItem(Receipt receipt, Long productId, int quantity, int price) {
        this.receipt = receipt;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    public void updateQuantity(int quantity) {
        this.quantity = quantity;
    }
}
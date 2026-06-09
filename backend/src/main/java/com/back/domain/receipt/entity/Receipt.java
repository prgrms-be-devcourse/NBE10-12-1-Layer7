package com.back.domain.receipt.entity;

import com.back.domain.member.entity.Member;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.ALL;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
public class Receipt extends BaseEntity {

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private LocalDate deliveryDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReceiptStatus status; // PENDING, PROCESSING, DELIVERED, CANCELLED

    @Column(nullable = false)
    private int totalPrice;

    @OneToMany(mappedBy = "receipt", cascade = ALL, orphanRemoval = true)
    private List<ReceiptItem> receiptItems = new ArrayList<>();

    public Receipt(Member member, LocalDate deliveryDate) {
        this.member = member;
        this.deliveryDate = deliveryDate;
        this.status = ReceiptStatus.PENDING;
        this.totalPrice = 0;
    }

    // 오후 2시 기준 배송일 계산
    public static LocalDate calcDeliveryDate() {
        LocalDateTime now = LocalDateTime.now();
        if (now.getHour() < 14) {
            return now.toLocalDate();
        }
        return now.toLocalDate().plusDays(1);
    }

    public void updateTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void updateStatus(ReceiptStatus status) {
        this.status = status;
    }
}
package com.back.domain.receipt.repository;

import com.back.domain.product.product.entity.Product;
import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReceiptItemRepository extends JpaRepository<ReceiptItem, Long> {

    // 주문 내 특정 상품 조회 (수량 증가용)
    Optional<ReceiptItem> findByReceiptAndProduct(Receipt receipt, Product product);

    // 주문의 전체 아이템 조회
    List<ReceiptItem> findByReceipt(Receipt receipt);
}
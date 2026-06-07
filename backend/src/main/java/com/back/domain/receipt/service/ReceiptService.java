package com.back.domain.receipt.service;

import com.back.domain.member.entity.Member;
import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptItem;
import com.back.domain.receipt.repository.ReceiptItemRepository;
import com.back.domain.receipt.repository.ReceiptRepository;
import com.back.global.globalExceptionHandler.ReceiptNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final ReceiptItemRepository receiptItemRepository;

    // 주문 생성 또는 상품 추가
    @Transactional
    public Receipt addItem(Member member, Long productId, int quantity, int price) {
        LocalDate deliveryDate = Receipt.calcDeliveryDate();

        // 같은 이메일 + 같은 배송기준일 주문 조회
        Receipt receipt = receiptRepository
                .findByMemberAndDeliveryDate(member, deliveryDate)
                .orElseGet(() -> receiptRepository.save(new Receipt(member, deliveryDate)));

        // 같은 상품이 있으면 수량 증가
        receiptItemRepository.findByReceiptAndProductId(receipt, productId)
                .ifPresentOrElse(
                        item -> item.updateQuantity(item.getQuantity() + quantity),
                        () -> receiptItemRepository.save(
                                new ReceiptItem(receipt, productId, quantity, price))
                );

        // 총 금액 업데이트
        int totalPrice = receiptItemRepository.findByReceipt(receipt)
                .stream()
                .mapToInt(item -> item.getPrice() * item.getQuantity())
                .sum();
        receipt.updateTotalPrice(totalPrice);

        return receiptRepository.findById(receipt.getId()).get();
    }

    // 회원의 주문 목록 조회
    @Transactional(readOnly = true)
    public List<Receipt> findByMember(Member member) {
        return receiptRepository.findByMember(member);
    }

    // 주문 상세 조회
    @Transactional(readOnly = true)
    public Receipt findById(Long id) {
        return receiptRepository.findById(id)
                .orElseThrow(() -> new ReceiptNotFoundException("주문을 찾을 수 없습니다."));
    }

    // 주문 취소
    @Transactional
    public void cancel(Receipt receipt) {
        receipt.updateStatus("CANCELLED");
    }

    // 주문 상태 변경 (관리자)
    @Transactional
    public void updateStatus(Receipt receipt, String status) {
        receipt.updateStatus(status);
    }

    // 전체 주문 조회 (관리자)
    @Transactional(readOnly = true)
    public List<Receipt> findAll() {
        return receiptRepository.findAll();
    }

    // 주문 삭제 (관리자)
    @Transactional
    public void delete(Receipt receipt) {
        receiptRepository.delete(receipt);
    }
}
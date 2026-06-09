package com.back.domain.receipt.service;

import com.back.domain.member.entity.Member;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.service.ProductService;
import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptItem;
import com.back.domain.receipt.entity.ReceiptStatus;
import com.back.domain.receipt.repository.ReceiptItemRepository;
import com.back.domain.receipt.repository.ReceiptRepository;
import com.back.global.globalExceptionHandler.ReceiptNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final ReceiptItemRepository receiptItemRepository;
    private final ProductService productService;

    // 주문 생성 또는 상품 추가
    @Transactional
    public Receipt addItem(Member member, Long productId, int quantity) {
        LocalDate deliveryDate = Receipt.calcDeliveryDate();

        Product product = productService.findByIdOrThrow(productId);
        int price = product.getPrice();

        Receipt receipt = receiptRepository
                .findByMemberAndDeliveryDateAndStatus(member, deliveryDate, ReceiptStatus.PENDING)  // ← PENDING 체크 추가
                .orElseGet(() -> receiptRepository.save(new Receipt(member, deliveryDate)));

        receiptItemRepository.findByReceiptAndProduct(receipt, product)  // ← product로 변경
                .ifPresentOrElse(
                        item -> item.updateQuantity(item.getQuantity() + quantity),
                        () -> receiptItemRepository.save(
                                new ReceiptItem(receipt, product, quantity, price))  // ← product로 변경
                );

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
        receiptItemRepository.findByReceipt(receipt)
                .forEach(item -> item.updateQuantity(0));
        receipt.updateTotalPrice(0);
        receipt.updateStatus(ReceiptStatus.CANCELLED);
    }

    // 주문 상태 변경 (관리자)
    @Transactional
    public void updateStatus(Receipt receipt, ReceiptStatus status) {
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

    // 오늘 미처리 주문 조회
    @Transactional(readOnly = true)
    public Optional<Receipt> findTodayPendingReceipt(Member member) {
        LocalDate deliveryDate = Receipt.calcDeliveryDate();
        return receiptRepository.findByMemberAndDeliveryDateAndStatus(
                member, deliveryDate, ReceiptStatus.PENDING);
    }

    // 오후 2시 배치 처리
    @Transactional
    public void processPendingReceipts() {
        LocalDate today = LocalDate.now();
        receiptRepository.findByDeliveryDateAndStatus(today, ReceiptStatus.PENDING)
                .forEach(receipt -> receipt.updateStatus(ReceiptStatus.PROCESSING));
    }
}
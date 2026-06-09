package com.back.global.initData;

import com.back.domain.member.entity.Member;
import com.back.domain.member.service.MemberService;
import com.back.domain.product.image.entity.Image;
import com.back.domain.product.image.repository.ImageRepository;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.entity.ProductCategory;
import com.back.domain.product.product.repository.ProductRepository;
import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptItem;
import com.back.domain.receipt.repository.ReceiptItemRepository;
import com.back.domain.receipt.repository.ReceiptRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class BaseInitData {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final MemberService memberService;
    private final ReceiptRepository receiptRepository;
    private final ReceiptItemRepository receiptItemRepository;

    @PostConstruct
    @Transactional
    public void init() {
        if (productRepository.count() > 0) return;

        // 상품 생성
        Product ethiopia = productRepository.save(new Product("에티오피아", 12000, ProductCategory.ETHIOPIA,
                imageRepository.save(new Image("/coffee-beans-ethiopia.png"))));
        Product brazil = productRepository.save(new Product("브라질", 10000, ProductCategory.BRAZIL,
                imageRepository.save(new Image("/coffee-beans-brazil.png"))));

        // 회원 생성
        memberService.join("user1@test.com", "1234", "서울시 강남구", "12345");
        memberService.join("user2@test.com", "1234", "서울시 마포구", "54321");

        // user1 주문
        Member member1 = memberService.findByEmail("user1@test.com");
        createReceipt(member1, ethiopia, 1, LocalDate.now().minusDays(7), "DELIVERED");
        createReceipt(member1, brazil,   2, LocalDate.now().minusDays(5), "DELIVERED");
        createReceipt(member1, ethiopia, 1, LocalDate.now().minusDays(3), "DELIVERED");
        createReceipt(member1, brazil,   2, LocalDate.now().minusDays(1), "PROCESSING");
        createReceipt(member1, ethiopia, 2, LocalDate.now(),              "PENDING");

        // user2 주문
        Member member2 = memberService.findByEmail("user2@test.com");
        createReceipt(member2, brazil,   1, LocalDate.now().minusDays(6), "DELIVERED");
        createReceipt(member2, ethiopia, 2, LocalDate.now().minusDays(4), "DELIVERED");
        createReceipt(member2, brazil,   1, LocalDate.now().minusDays(2), "DELIVERED");
        createReceipt(member2, ethiopia, 3, LocalDate.now().minusDays(1), "PROCESSING");
        createReceipt(member2, brazil,   2, LocalDate.now(),              "PENDING");
    }

    private void createReceipt(Member member, Product product, int quantity, LocalDate deliveryDate, String status) {
        Receipt receipt = receiptRepository.save(new Receipt(member, deliveryDate));
        receipt.updateStatus(status);
        receipt.updateTotalPrice(product.getPrice() * quantity);
        receiptRepository.save(receipt);  // ← 상태/금액 DB 반영
        receiptItemRepository.save(new ReceiptItem(receipt, product, quantity, product.getPrice()));
    }
}
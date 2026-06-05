package com.back.domain.receipt.controller;

import com.back.domain.member.entity.Member;
import com.back.domain.member.service.MemberService;
import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.service.ReceiptService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/receipts")
@RequiredArgsConstructor
public class ApiV1ReceiptController {

    private final ReceiptService receiptService;
    private final MemberService memberService;

    record AddItemReqBody(
            @NotNull Long productId,
            @NotNull Integer quantity,
            @NotNull Integer price
    ) {}

    // 주문 생성 또는 상품 추가
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public RsData<Receipt> addItem(
            @RequestParam Long actorId,
            @Valid @RequestBody AddItemReqBody body
    ) {
        Member member = memberService.findById(actorId);
        Receipt receipt = receiptService.addItem(
                member, body.productId(), body.quantity(), body.price());
        return new RsData<>("201-1", "주문이 완료되었습니다.", receipt);
    }

    // 내 주문 목록 조회
    @GetMapping
    @Transactional(readOnly = true)
    public RsData<List<Receipt>> getMyReceipts(@RequestParam Long actorId) {
        Member member = memberService.findById(actorId);
        List<Receipt> receipts = receiptService.findByMember(member);
        return new RsData<>("200-1", "주문 목록 조회 성공", receipts);
    }

    // 주문 상세 조회
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public RsData<Receipt> getReceipt(
            @RequestParam Long actorId,
            @PathVariable Long id
    ) {
        Receipt receipt = receiptService.findById(id);
        return new RsData<>("200-1", "주문 조회 성공", receipt);
    }

    // 주문 취소
    @DeleteMapping("/{id}")
    @Transactional
    public RsData<Void> cancel(
            @RequestParam Long actorId,
            @PathVariable Long id
    ) {
        Receipt receipt = receiptService.findById(id);
        receiptService.cancel(receipt);
        return new RsData<>("200-1", "주문이 취소되었습니다.", null);
    }
}
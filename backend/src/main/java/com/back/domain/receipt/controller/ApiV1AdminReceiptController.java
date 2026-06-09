package com.back.domain.receipt.controller;

import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptStatus;
import com.back.domain.receipt.service.ReceiptService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/receipts")
@RequiredArgsConstructor
public class ApiV1AdminReceiptController {

    private final ReceiptService receiptService;

    record UpdateStatusReqBody(
            @NotNull ReceiptStatus status
    ) {}

    // 전체 주문 조회
    @GetMapping
    @Transactional(readOnly = true)
    public RsData<List<Receipt>> getAll() {
        List<Receipt> receipts = receiptService.findAll();
        return new RsData<>("200-1", "전체 주문 조회 성공", receipts);
    }

    // 주문 상태 변경
    @PutMapping("/{id}")
    @Transactional
    public RsData<Void> updateStatus(
            @PathVariable("id") Long id,
            @Valid @RequestBody UpdateStatusReqBody body
    ) {
        Receipt receipt = receiptService.findById(id);
        receiptService.updateStatus(receipt, body.status());
        return new RsData<>("200-1", "주문 상태가 변경되었습니다.", null);
    }

    // 주문 삭제
    @DeleteMapping("/{id}")
    @Transactional
    public RsData<Void> delete(@PathVariable("id") Long id) {
        Receipt receipt = receiptService.findById(id);
        receiptService.delete(receipt);
        return new RsData<>("200-1", "주문이 삭제되었습니다.", null);
    }
}
package com.back.global.scheduler;

import com.back.domain.receipt.service.ReceiptService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReceiptScheduler {

    private final ReceiptService receiptService;

    // 매일 오후 2시에 PENDING → PROCESSING 자동 변경
    @Scheduled(cron = "0 0 14 * * *")
    public void processReceipts() {
        receiptService.processPendingReceipts();
    }
}
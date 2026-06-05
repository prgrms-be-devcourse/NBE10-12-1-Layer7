package com.back.domain.receipt.repository;

import com.back.domain.receipt.entity.Receipt;
import com.back.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

    // 같은 이메일 + 같은 배송기준일 주문 조회 (주문 합치기용)
    Optional<Receipt> findByMemberAndDeliveryDate(Member member, LocalDate deliveryDate);

    // 회원의 전체 주문 조회
    List<Receipt> findByMember(Member member);
}
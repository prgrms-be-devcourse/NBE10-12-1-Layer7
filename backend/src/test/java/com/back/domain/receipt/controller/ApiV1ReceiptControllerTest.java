package com.back.domain.receipt.controller;

import com.back.domain.member.entity.Member;
import com.back.domain.member.service.MemberService;
import com.back.domain.receipt.entity.Receipt;
import com.back.domain.receipt.entity.ReceiptStatus;
import com.back.domain.receipt.service.ReceiptService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ActiveProfiles("test")
@WebMvcTest({
        ApiV1ReceiptController.class,
        ApiV1AdminReceiptController.class
})
@AutoConfigureMockMvc(addFilters = false)
class ApiV1ReceiptControllerTest {

    @Autowired
    MockMvc mvc;

    @MockitoBean
    ReceiptService receiptService;

    @MockitoBean
    MemberService memberService;

    @MockitoBean
    JpaMetamodelMappingContext jpaMetamodelMappingContext;

    @Test
    @DisplayName("주문 생성")
    void addItem() throws Exception {
        Member member = createMember();
        Receipt receipt = createReceipt(member);

        given(receipt.getTotalPrice()).willReturn(20000);
        given(receipt.getReceiptItems()).willReturn(List.of());

        given(memberService.findById(1L)).willReturn(member);
        given(receiptService.addItem(any(Member.class), eq(1L), eq(2)))
                .willReturn(receipt);

        mvc.perform(
                        post("/api/v1/receipts")
                                .param("actorId", "1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "productId": 1,
                                            "quantity": 2
                                        }
                                        """)
                )
                .andExpect(status().isCreated())
                .andExpect(handler().handlerType(ApiV1ReceiptController.class))
                .andExpect(handler().methodName("addItem"))
                .andExpect(jsonPath("$.resultCode").value("201-1"))
                .andExpect(jsonPath("$.msg").value("주문이 완료되었습니다."));
    }

    @Test
    @DisplayName("내 주문 목록 조회")
    void getMyReceipts() throws Exception {
        Member member = createMember();

        given(memberService.findById(1L)).willReturn(member);
        given(receiptService.findByMember(member)).willReturn(List.of());

        mvc.perform(
                        get("/api/v1/receipts")
                                .param("actorId", "1")
                )
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1ReceiptController.class))
                .andExpect(handler().methodName("getMyReceipts"))
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("주문 목록 조회 성공"))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("주문 상세 조회")
    void getReceipt() throws Exception {
        Member member = createMember();
        Receipt receipt = createReceipt(member);

        given(receiptService.findById(1L)).willReturn(receipt);

        mvc.perform(
                        get("/api/v1/receipts/1")
                                .param("actorId", "1")
                )
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1ReceiptController.class))
                .andExpect(handler().methodName("getReceipt"))
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("주문 조회 성공"));
    }

    @Test
    @DisplayName("주문 취소")
    void cancel() throws Exception {
        Member member = createMember();
        Receipt receipt = createReceipt(member);

        given(receiptService.findById(1L)).willReturn(receipt);

        mvc.perform(
                        delete("/api/v1/receipts/1")
                                .param("actorId", "1")
                )
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1ReceiptController.class))
                .andExpect(handler().methodName("cancel"))
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("주문이 취소되었습니다."));
    }

    @Test
    @DisplayName("관리자 전체 주문 조회")
    void adminGetAll() throws Exception {
        given(receiptService.findAll()).willReturn(List.of());

        mvc.perform(get("/api/v1/admin/receipts"))
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1AdminReceiptController.class))
                .andExpect(handler().methodName("getAll"))
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("전체 주문 조회 성공"))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("관리자 주문 상태 변경")
    void adminUpdateStatus() throws Exception {
        Receipt receipt = mock(Receipt.class);

        given(receiptService.findById(1L)).willReturn(receipt);

        mvc.perform(
                        put("/api/v1/admin/receipts/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {
                                            "status": "DELIVERED"
                                        }
                                        """)
                )
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1AdminReceiptController.class))
                .andExpect(handler().methodName("updateStatus"))
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("주문 상태가 변경되었습니다."));
    }

    @Test
    @DisplayName("관리자 주문 삭제")
    void adminDelete() throws Exception {
        Receipt receipt = mock(Receipt.class);

        given(receiptService.findById(1L)).willReturn(receipt);

        mvc.perform(delete("/api/v1/admin/receipts/1"))
                .andExpect(status().isOk())
                .andExpect(handler().handlerType(ApiV1AdminReceiptController.class))
                .andExpect(handler().methodName("delete"))
                .andExpect(jsonPath("$.resultCode").value("200-1"))
                .andExpect(jsonPath("$.msg").value("주문이 삭제되었습니다."));
    }

    private Member createMember() {
        Member member = mock(Member.class);

        given(member.getId()).willReturn(1L);
        given(member.getEmail()).willReturn("test@test.com");
        given(member.getAddress()).willReturn("서울시 강남구");
        given(member.getPostalCode()).willReturn("12345");

        return member;
    }

    private Receipt createReceipt(Member member) {
        Receipt receipt = mock(Receipt.class);

        given(receipt.getId()).willReturn(1L);
        given(receipt.getMember()).willReturn(member);
        given(receipt.getDeliveryDate()).willReturn(LocalDate.now());
        given(receipt.getStatus()).willReturn(ReceiptStatus.PENDING);
        given(receipt.getTotalPrice()).willReturn(20000);
        given(receipt.getReceiptItems()).willReturn(List.of());

        return receipt;
    }
}
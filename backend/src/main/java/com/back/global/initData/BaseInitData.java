package com.back.global.initData;

import com.back.domain.member.service.MemberService;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.entity.ProductCategory;
import com.back.domain.product.product.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.awt.*;

@Component
@RequiredArgsConstructor
public class BaseInitData {

    private final ProductRepository productRepository;
    private final MemberService memberService;

    @PostConstruct
    public void init() {
        initProducts();
        initMembers();
    }

    private void initProducts() {
        if (productRepository.count() > 0) return;



        productRepository.save(new Product(
                "에티오피아",
                12000,
                ProductCategory.ETHIOPIA,
                "/images/coffee-beans-ethiopia.png"

        ));

        productRepository.save(new Product(
                "브라질",
                10000,
                ProductCategory.BRAZIL,
                "/images/coffee-beans-brazil.png"
        ));
    }

    private void initMembers() {
        if (memberService.count() > 0) return;

        memberService.join(
                "user1@test.com",
                "1234",
                "서울시 강남구",
                "12345"
        );

        memberService.join(
                "user2@test.com",
                "1234",
                "서울시 마포구",
                "54321"
        );
    }
}
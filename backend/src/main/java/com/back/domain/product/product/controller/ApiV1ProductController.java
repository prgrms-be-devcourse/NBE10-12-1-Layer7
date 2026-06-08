package com.back.domain.product.product.controller;

import com.back.domain.product.product.dto.ProductDto;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ApiV1ProductController {

    private final ProductService productService;

    // 상품 목록 조회
    @GetMapping
    @Transactional(readOnly = true)
    public List<ProductDto> getItems() {
        List<Product> items = productService.findAll();

        return items.stream()
                .map(ProductDto::new)
                .toList();
    }

    // 상품 상세 조회
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ProductDto getItem(@PathVariable("id") long id) {
        Product product = productService.findByIdOrThrow(id);
        return new ProductDto(product);
    }
}

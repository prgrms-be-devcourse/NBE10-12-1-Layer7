package com.back.domain.product.product.controller;

import com.back.domain.product.product.dto.ProductDto;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.service.ProductService;
import com.back.domain.product.product.entity.ProductCategory;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/products")
@RequiredArgsConstructor
public class ApiV1AdminProductController {

    private final com.back.domain.product.product.service.ProductService productService;

    // DTO - 생성
    public record ProductCreateReqBody(
            @NotBlank String beanName,
            int price,
            @NotNull ProductCategory category,
            Long imageId
    ) {}

    // DTO - 수정
    public record ProductModifyReqBody(
            @NotBlank String beanName,
            int price,
            @NotNull ProductCategory category,
            Long imageId
    ) {}

    // 상품 생성
    @PostMapping
    @Transactional
    public RsData<ProductDto> create(@RequestBody @Valid ProductCreateReqBody reqBody) {

        Product product = productService.create(
                reqBody.beanName(),
                reqBody.price(),
                reqBody.category(),
                reqBody.imageId()
        );

        return new RsData<>(
                "201-1",
                "상품이 생성되었습니다.",
                new ProductDto(product)
        );
    }

    // 상품 수정
    @PutMapping("/{id}")
    @Transactional
    public RsData<Void> modify(
            @PathVariable long id,
            @RequestBody @Valid ProductModifyReqBody reqBody
    ) {
        Product product = productService.findByIdOrThrow(id);

        productService.modify(
                product,
                reqBody.beanName(),
                reqBody.price(),
                reqBody.category(),
                reqBody.imageId()
        );

        return new RsData<>(
                "200-1",
                "상품이 수정되었습니다."
        );
    }

    // 상품 삭제
    @DeleteMapping("/{id}")
    @Transactional
    public RsData<Void> delete(@PathVariable long id) {
        Product product = productService.findByIdOrThrow(id);
        productService.delete(product);

        return new RsData<>(
                "200-1",
                "상품이 삭제되었습니다."
        );
    }
}

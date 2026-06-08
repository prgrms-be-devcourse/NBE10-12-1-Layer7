package com.back.domain.product.product.dto;

import com.back.domain.product.product.entity.ProductCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductCreateReqBody(
        @NotBlank String beanName,
        int price,
        @NotNull ProductCategory category,
        Long imageId) {}
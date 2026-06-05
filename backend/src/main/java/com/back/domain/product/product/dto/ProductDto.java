package com.back.domain.product.product.dto;

import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.entity.ProductCategory;

import java.time.LocalDateTime;

public record ProductDto(
      long id,
      LocalDateTime createDate,
      LocalDateTime modifyDate,
      String beanName,
      int price,
      ProductCategory category,
        Long imageId
) {

    public ProductDto(Product product) {
        this(
                product.getId(),
                product.getCreateDate(),
                product.getModifyDate(),
                product.getBeanName(),
                product.getPrice(),
                product.getCategory(),
                product.getImageId()
        );
    }
}
package com.back.domain.product.product.entity;

import com.back.domain.product.product.entity.ProductCategory;
import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor

public class Product extends BaseEntity {
    private String beanName;
    private int price;
    @Enumerated(EnumType.STRING)
    private ProductCategory category;
    private Long imageId;

    public Product(String beanName, int price, ProductCategory category, Long imageId) {
        this.beanName = beanName;
        this.price = price;
        this.category = category;
        this.imageId = imageId;
    }

}

package com.back.domain.product.product.entity;

import com.back.global.jpa.entity.BaseEntity;
import jakarta.persistence.*;
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

    private String imageUrl;

    public Product(String beanName, int price, ProductCategory category,String imageUrl) {
        this.beanName = beanName;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
    }

    public void modify(
            String beanName,
            int price,
            ProductCategory category,
            String imageUrl
    ) {
        this.beanName = beanName;
        this.price = price;
        this.category = category;
        this.imageUrl = imageUrl;
    }

}

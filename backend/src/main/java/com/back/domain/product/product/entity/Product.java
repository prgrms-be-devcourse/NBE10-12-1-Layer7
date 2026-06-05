package com.back.domain.product.product.entity;

import com.back.domain.product.image.entity.Image;
import com.back.domain.product.product.entity.ProductCategory;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_id")
    private Image image;

    public Product(String beanName, int price, ProductCategory category, Image image) {
        this.beanName = beanName;
        this.price = price;
        this.category = category;
        this.image = image;
    }

    public void modify(
            String beanName,
            int price,
            ProductCategory category,
            Image image
    ) {
        this.beanName = beanName;
        this.price = price;
        this.category = category;
        this.image = image;
    }

}

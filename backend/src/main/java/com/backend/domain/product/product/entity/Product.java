package com.backend.domain.product.product.entity;

import com.backend.global.jpa.entity.BaseEntity;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@NoArgsConstructor

public class Product extends BaseEntity {
    private String beanName;
    private int price;
    private String category;

    public Product(String beanName, int price, String category){
        this.beanName=beanName;
        this.price=price;
        this.category=category;
    }

}

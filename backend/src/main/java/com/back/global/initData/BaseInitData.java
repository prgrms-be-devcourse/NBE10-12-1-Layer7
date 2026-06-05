package com.back.global.initData;

import com.back.domain.product.image.entity.Image;
import com.back.domain.product.image.rository.ImageRepository;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.entity.ProductCategory;
import com.back.domain.product.product.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BaseInitData {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;

    @PostConstruct
    public void init() {

        Image img1 = imageRepository.save(new Image("https://coffee1.jpg"));
        Image img2 = imageRepository.save(new Image("https://coffee2.jpg"));

        productRepository.save(new Product(
                "에티오피아",
                12000,
                ProductCategory.ETHIOPIA,
                img1.getId()
        ));

        productRepository.save(new Product(
                "브라질",
                10000,
                ProductCategory.BRAZIL,
                img2.getId()
        ));
    }
}
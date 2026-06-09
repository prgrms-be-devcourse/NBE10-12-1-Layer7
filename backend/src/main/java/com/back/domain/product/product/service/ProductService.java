package com.back.domain.product.product.service;


import com.back.domain.product.image.entity.Image;
import com.back.domain.product.image.repository.ImageRepository;
import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.entity.ProductCategory;
import com.back.domain.product.product.repository.ProductRepository;
import com.back.global.globalExceptionHandler.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;


    public long count() {
        return productRepository.count();
    }


    public Product create(
            String beanName,
            int price,
            ProductCategory category,
            Long imageId
    )  {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("이미지 없음"));

        Product product = new Product(beanName, price, category, image);

        return productRepository.save(product);
    }

    public void modify(
            Product product,
            String beanName,
            int price,
            ProductCategory category,
            Long imageId
    ) {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("이미지 없음"));

        product.modify(beanName, price, category, image);
    }


    public Product findByIdOrThrow(long id) {
        return productRepository.findById(id)
                .orElseThrow(ProductNotFoundException::new);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public void delete(Product product) {
        productRepository.delete(product);
    }

}
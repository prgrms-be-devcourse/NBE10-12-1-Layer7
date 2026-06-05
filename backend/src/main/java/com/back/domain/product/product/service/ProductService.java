package com.back.domain.product.product.service;

import com.back.domain.product.product.entity.Product;
import com.back.domain.product.product.entity.ProductCategory;
import com.back.domain.product.product.repository.ProductRepository;
import com.back.global.globalExceptionHandler.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public long count() {
        return productRepository.count();
    }

    public Product create(
            String beanName,
            int price,
            ProductCategory category,
            Long imageId
    ) {
        Product product = new Product(
                beanName,
                price,
                category,
                imageId
        );

        return productRepository.save(product);
    }

    public void modify(
            Product product,
            String beanName,
            int price,
            ProductCategory category,
            Long imageId
    ) {
        product.modify(beanName, price, category, imageId);
    }

    public Optional<Product> findById(long id) {
        return productRepository.findById(id);
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

    public Optional<Product> findLatest() {
        return productRepository.findFirstByOrderByIdDesc();
    }

    public void flush() {
        productRepository.flush();
    }
}
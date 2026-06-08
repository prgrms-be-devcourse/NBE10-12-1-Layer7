package com.back.domain.product.product.service;


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


    public Product create(
            String beanName,
            int price,
            ProductCategory category,
            String imageUrl
    )  {
        Product product = new Product(beanName, price, category, imageUrl);

        return productRepository.save(product);
    }

    public void modify(
            Product product,
            String beanName,
            int price,
            ProductCategory category,
            String imageUrl
    ) {


        product.modify(beanName, price, category, imageUrl);
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
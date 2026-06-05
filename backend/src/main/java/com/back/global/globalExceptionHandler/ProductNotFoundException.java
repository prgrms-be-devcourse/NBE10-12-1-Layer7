package com.back.global.globalExceptionHandler;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String message) {
        super("해당 상품이없습니다.");
    }
}

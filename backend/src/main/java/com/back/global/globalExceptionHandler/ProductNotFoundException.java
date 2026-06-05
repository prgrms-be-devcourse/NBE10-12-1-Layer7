package com.back.global.globalExceptionHandler;

public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException() {
        super("해당 상품이 없습니다.");
    }
}

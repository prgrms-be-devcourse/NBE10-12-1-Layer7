package com.backend.global.globalExceptionHandler;

public class UnauthenticatedException extends RuntimeException {
    public UnauthenticatedException() {
        super("로그인 후 이용해주세요.");
    }
}


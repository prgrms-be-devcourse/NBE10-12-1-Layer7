package com.backend.global.globalExceptionHandler;

public class MemberDuplicateUsernameException extends RuntimeException {
    public MemberDuplicateUsernameException(String username) {
        super("%s(은)는 이미 사용중인 이메일 입니다.".formatted(username));
    }
}
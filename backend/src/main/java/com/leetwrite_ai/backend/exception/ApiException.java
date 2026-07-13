package com.leetwrite_ai.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {
    private final ErrorCode errorCode;
    private final HttpStatus status;
    private final String field;

    public ApiException(ErrorCode errorCode, String message, HttpStatus status) {
        this(errorCode, message, status, null);
    }

    public ApiException(ErrorCode errorCode, String message, HttpStatus status, String field) {
        super(message);
        this.errorCode = errorCode;
        this.status = status;
        this.field = field;
    }
}

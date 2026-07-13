package com.leetwrite_ai.backend.exception;

public enum ErrorCode {
    INVALID_PROBLEM_URL,
    INVALID_LANGUAGE,
    EMPTY_CODE,
    CODE_TOO_LONG,
    AI_RESPONSE_INVALID,
    RATE_LIMITED,
    AI_PROVIDER_ERROR,
    AI_TIMEOUT,
    INTERNAL_ERROR
}

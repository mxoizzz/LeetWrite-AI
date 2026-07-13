package com.leetwrite_ai.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
    private ErrorDetail error;

    @Data
    @AllArgsConstructor
    public static class ErrorDetail {
        private String code;
        private String message;
        private String field;
    }
}

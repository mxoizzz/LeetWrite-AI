package com.leetwrite_ai.backend.exception;

import com.leetwrite_ai.backend.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientResponseException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApiException(ApiException ex) {
        ErrorResponse response = new ErrorResponse(
            new ErrorResponse.ErrorDetail(ex.getErrorCode().name(), ex.getMessage(), ex.getField())
        );
        return new ResponseEntity<>(response, ex.getStatus());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String field = fieldError != null ? fieldError.getField() : null;
        String message = fieldError != null ? fieldError.getDefaultMessage() : "Validation failed";
        
        ErrorCode errorCode = ErrorCode.INTERNAL_ERROR;
        if ("problemUrl".equals(field)) {
            errorCode = ErrorCode.INVALID_PROBLEM_URL;
        } else if ("language".equals(field)) {
            errorCode = ErrorCode.INVALID_LANGUAGE;
        } else if ("code".equals(field)) {
            if ("Size".equals(fieldError.getCode())) {
                errorCode = ErrorCode.CODE_TOO_LONG;
            } else {
                errorCode = ErrorCode.EMPTY_CODE;
            }
        }

        ErrorResponse response = new ErrorResponse(
            new ErrorResponse.ErrorDetail(errorCode.name(), message, field)
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<ErrorResponse> handleTimeout(ResourceAccessException ex) {
        ErrorResponse response = new ErrorResponse(
            new ErrorResponse.ErrorDetail(ErrorCode.AI_TIMEOUT.name(), "AI provider did not respond in time.", null)
        );
        return new ResponseEntity<>(response, HttpStatus.GATEWAY_TIMEOUT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception ex) {
        ErrorResponse response = new ErrorResponse(
            new ErrorResponse.ErrorDetail(ErrorCode.INTERNAL_ERROR.name(), "An unexpected server error occurred.", null)
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

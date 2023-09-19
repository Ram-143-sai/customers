package com.lalith.customer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<CustomErrorResponse> handleResponseStatusException(ResponseStatusException ex) {
        String errorMessage = ex.getReason();

        if (ex.getStatusCode() == HttpStatus.NOT_FOUND) {
            errorMessage = "Resource not found! " + errorMessage;
        } else if (ex.getStatusCode() == HttpStatus.UNAUTHORIZED) {
            errorMessage = "Unauthorized Access! " + errorMessage;
        }

        CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
        return new ResponseEntity<>(errorResponse, ex.getStatusCode());
    }
}

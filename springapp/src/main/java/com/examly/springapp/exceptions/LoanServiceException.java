package com.examly.springapp.exceptions;

public class LoanServiceException extends RuntimeException {
    public LoanServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

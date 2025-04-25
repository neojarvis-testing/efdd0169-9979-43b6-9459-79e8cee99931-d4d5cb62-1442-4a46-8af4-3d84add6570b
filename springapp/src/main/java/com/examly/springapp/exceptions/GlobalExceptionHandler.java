package com.examly.springapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException (UserAlreadyExistsException e){
        return ResponseEntity.status(409).body(e.getMessage());
    }

    @ExceptionHandler(IncorrectEmailOrPassword.class)
    public ResponseEntity<String> handleIncorrectEmailOrPassword(IncorrectEmailOrPassword e){
        return ResponseEntity.status(409).body(e.getMessage());
    }

    @ExceptionHandler(FeedbackNotFoundException.class)
    public ResponseEntity<String> handleFeedbackNotFoundException(FeedbackNotFoundException e){
        return ResponseEntity.status(401).body(e.getMessage());
    }

    @ExceptionHandler(LoanNotFoundException.class)
    public ResponseEntity<String> handleLoanNotFoundException(LoanNotFoundException e){
        return ResponseEntity.status(401).body(e.getMessage());
    }

    // Handle LoanServiceException
    // @ExceptionHandler(LoanServiceException.class)
    // public ResponseEntity<ErrorResponse> handleLoanServiceException(LoanServiceException ex, WebRequest request) {
    //     // logger.error("LoanServiceException: {}", ex.getMessage());
    //     ErrorResponse errorResponse = new ErrorResponse(ex.getMessage());
    //     return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    // }


}

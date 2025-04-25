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

    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<String> handleInvalidInputException(InvalidInputException ex) {
        return ResponseEntity.status(409).body(ex.getMessage());
    }

    @ExceptionHandler(LoanApplicationNotFoundException.class)
    public ResponseEntity<String> handleLoanApplicationNotFoundException(LoanApplicationNotFoundException ex) {
        return ResponseEntity.status(409).body(ex.getMessage());
    }

}


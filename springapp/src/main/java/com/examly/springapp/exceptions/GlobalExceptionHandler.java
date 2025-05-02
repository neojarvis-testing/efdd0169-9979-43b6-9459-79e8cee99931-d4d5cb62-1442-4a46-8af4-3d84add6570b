package com.examly.springapp.exceptions;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
 
@ControllerAdvice
public class GlobalExceptionHandler {
 
    private static final String MESSAGE_KEY = "message";

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, String>> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(IncorrectEmailOrPassword.class)
    public ResponseEntity<Map<String, String>> handleIncorrectEmailOrPassword(IncorrectEmailOrPassword e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(FeedbackNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleFeedbackNotFoundException(FeedbackNotFoundException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(LoanNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleLoanNotFoundException(LoanNotFoundException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUserNotFound(UserNotFoundException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(FeedbackListEmptyException.class)
    public ResponseEntity<Map<String, String>> handleFeedbackListEmptyException(FeedbackListEmptyException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<Map<String, String>> handleInvalidInputException(InvalidInputException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(LoanApplicationNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleLoanApplicationNotFoundException(LoanApplicationNotFoundException e) {
        return ResponseEntity.status(409).body(Map.of(MESSAGE_KEY, e.getMessage()));
    }
 
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException e) {
        List<FieldError> errors = e.getBindingResult().getFieldErrors();
        Map<String, String> map = new HashMap<>();
        for (FieldError err : errors) {
            map.put(err.getField(), err.getDefaultMessage());
        }
        return ResponseEntity.status(400).body(map);
    }
}

package com.examly.springapp.exceptions;

public class FeedbackListEmptyException extends RuntimeException{
    public FeedbackListEmptyException(String message) {
        super(message);
    }
}

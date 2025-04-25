package com.examly.springapp.exceptions;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String msg){
        super(msg);
    }

}

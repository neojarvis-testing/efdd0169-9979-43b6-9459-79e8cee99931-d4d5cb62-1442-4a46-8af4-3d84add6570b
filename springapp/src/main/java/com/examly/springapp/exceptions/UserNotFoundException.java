package com.examly.springapp.exceptions;


public class UserNotFoundException extends Exception {

    public UserNotFoundException (String msg){
        super(msg);
    }
    
}

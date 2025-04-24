package com.examly.springapp.exceptions;

public class IncorrectEmailOrPassword extends RuntimeException{
    public IncorrectEmailOrPassword(String msg){
        super(msg);
    }

}

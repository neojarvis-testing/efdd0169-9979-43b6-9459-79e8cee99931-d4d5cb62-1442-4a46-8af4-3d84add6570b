package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.LoginResponse;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserServiceImpl;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    UserServiceImpl service;

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@Valid @RequestBody User user){
        user=service.createUser(user);
        return ResponseEntity.status(201).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginDTO loginDTO){
        LoginResponse loginResponse=service.loginUser(loginDTO);
        if(loginResponse!=null){
            return ResponseEntity.status(200).body(loginResponse);
        }
        return ResponseEntity.status(401).body(null);
    }

}

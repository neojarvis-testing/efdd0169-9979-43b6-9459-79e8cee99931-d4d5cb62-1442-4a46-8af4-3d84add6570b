package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.UserDTO;
import com.examly.springapp.service.UserServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {

    private final UserServiceImpl service;
    public AuthController(UserServiceImpl service){
             this.service=service;
    }


    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO){
        userDTO=service.createUser(userDTO);
        return ResponseEntity.status(201).body(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDTO> loginUser(@Valid @RequestBody LoginDTO loginDTO){
         loginDTO=service.loginUser(loginDTO);
        if(loginDTO!=null){
            return ResponseEntity.status(200).body(loginDTO);
        }
        return ResponseEntity.status(401).body(null);
    }

}

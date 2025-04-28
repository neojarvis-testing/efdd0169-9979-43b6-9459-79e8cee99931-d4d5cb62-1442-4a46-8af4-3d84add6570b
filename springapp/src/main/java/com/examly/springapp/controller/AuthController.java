package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.TokenDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDTO;
import com.examly.springapp.service.UserService;
import com.examly.springapp.service.UserServiceImpl;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtlis;

    private final UserServiceImpl service;

    public AuthController(UserServiceImpl service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        userDTO = service.createUser(userDTO);
        return ResponseEntity.status(201).body(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> loginUser(@RequestBody User user) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtUtlis.genrateToken(authentication);
        TokenDTO tokenDTO = service.makeTokenDto(user, token);
        return ResponseEntity.status(200).body(tokenDTO);
    }

}

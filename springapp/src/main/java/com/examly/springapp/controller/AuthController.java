package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.model.TokenDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDTO;
import com.examly.springapp.service.UserServiceImpl;
import org.springframework.security.core.Authentication;

@RestController // Declares this class as a REST controller
public class AuthController { // Handles authentication and user registration requests

    @Autowired
    AuthenticationManager authenticationManager; // Manages authentication requests
    @Autowired
    JwtUtils jwtUtlis; // Utility class for JWT token generation

    private final UserServiceImpl service; // User service instance for handling user operations

    public AuthController(UserServiceImpl service) { // Constructor to initialize UserServiceImpl
        this.service = service;
    }

    @PostMapping("/register") // Maps user registration requests
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO) { // Registers a new user
        userDTO = service.createUser(userDTO); // Calls service to create a user
        return ResponseEntity.status(201).body(userDTO); // Returns created user details with 201 status
    } 

    @PostMapping("/login") // Maps user login requests
    public ResponseEntity<TokenDTO> loginUser(@RequestBody User user) { // Authenticates user and returns JWT token
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())); // Authenticates user credentials
        SecurityContextHolder.getContext().setAuthentication(authentication); // Stores authentication in security context
        String token = jwtUtlis.genrateToken(authentication); // Generates JWT token
        TokenDTO tokenDTO = service.makeTokenDto(user, token);  // Creates token response DTO
        return ResponseEntity.status(200).body(tokenDTO);  // Returns token with 200 status
    }

    @GetMapping("/someEndpoint")
public ResponseEntity<String> someGetMethod() {
    return ResponseEntity.ok("GET request supported");
}

}

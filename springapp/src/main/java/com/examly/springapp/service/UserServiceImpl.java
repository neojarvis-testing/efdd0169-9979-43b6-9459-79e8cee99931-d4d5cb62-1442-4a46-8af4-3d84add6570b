package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.IncorrectEmailOrPassword;
import com.examly.springapp.exceptions.UserAlreadyExistsException;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.LoginResponse;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{


    private final UserRepo userRepo;
    public UserServiceImpl(UserRepo urepo){
        this.userRepo=urepo;
    }

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
           throw new UserAlreadyExistsException("User with this email already exists!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
       User existingUser=userRepo.findByEmail(loginDTO.getEmail());
       if (existingUser == null) {
                return null;
       }
        if (loginDTO.getPassword().equals(existingUser.getPassword())) {
            String token="dummy-token";
            return new LoginResponse(existingUser.getUserId().intValue(),existingUser.getUserRole(),token,existingUser.getUsername());  
    }
   throw new IncorrectEmailOrPassword("Incorrect email or Password"); // exception is not found

       
    }
    
}

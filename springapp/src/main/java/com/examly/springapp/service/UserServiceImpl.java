package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

public class UserServiceImpl implements UserService{

    @Autowired
    UserRepo userRepo;
    PasswordEncoder passwordEncoder;

    @Override
    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
           // throw new UserAlreadyExistException("User with this email already exists!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public User loginUser(User user) {
       User existingUser=userRepo.findByEmail(user.getEmail());
       if (existingUser == null) {
                return null;
       }
        if (user.getPassword().equals(existingUser.getPassword())) {
            return existingUser;  
    }
    return null;
       
    }
    

}

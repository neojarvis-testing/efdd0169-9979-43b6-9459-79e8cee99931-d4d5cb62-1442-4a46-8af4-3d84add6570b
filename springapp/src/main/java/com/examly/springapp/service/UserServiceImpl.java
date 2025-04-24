package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.IncorrectEmailOrPassword;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepo userRepo;
    public UserServiceImpl(UserRepo urepo){
        this.userRepo=urepo;
    }
    @Override
    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new UserAlreadyExistsException("User with this email already exists!!");//exception when user not found
        }
        return userRepo.save(user);// to post the user
    }

    @Override
    public User loginUser(User user) {
       User existingUser=userRepo.findByEmail(user.getEmail());// checking where user exists or not
       if (existingUser == null) {
                return null;
       }
        if (user.getPassword().equals(existingUser.getPassword())) // validating password
            return existingUser;  

    throw new IncorrectEmailOrPassword("Incorrect email or Password"); // exception is not found
       
    }
    
}

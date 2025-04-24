package com.examly.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

public class UserServiceImpl implements UserService{

    @Autowired
    UserRepo userRepo;

    @Override
    public User createUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }

    @Override
    public User loginUser(User user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }
    

}

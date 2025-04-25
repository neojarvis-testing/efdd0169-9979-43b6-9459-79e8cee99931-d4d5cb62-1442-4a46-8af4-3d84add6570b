package com.examly.springapp.service;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.LoginResponse;
import com.examly.springapp.model.User;

public interface UserService {

    User createUser(User user);
    LoginResponse loginUser(LoginDTO loginDTO);

}

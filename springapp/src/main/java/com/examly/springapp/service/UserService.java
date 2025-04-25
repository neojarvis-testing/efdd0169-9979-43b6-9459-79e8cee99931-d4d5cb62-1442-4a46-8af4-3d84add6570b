package com.examly.springapp.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.UserDTO;

public interface UserService {

    UserDTO createUser(UserDTO userDTO);
    LoginDTO loginUser(LoginDTO loginDTO);
    // UserDetails loadUserByUsername(String email);

}

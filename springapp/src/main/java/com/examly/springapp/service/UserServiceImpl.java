package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import org.springframework.stereotype.Service;

import com.examly.springapp.config.UserPrinciple;
import com.examly.springapp.exceptions.IncorrectEmailOrPassword;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.exceptions.UserNotFoundException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.TokenDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDTO;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.utility.Usermapper;


@Service
public class UserServiceImpl implements UserDetailsService,UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo urepo,PasswordEncoder passwordEncoder) {
        this.userRepo = urepo;
        this.passwordEncoder=passwordEncoder;
    }

    // Registers a new user in the system.
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = Usermapper.mapToUser(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User existingUser =userRepo.findByEmail(userDTO.getEmail());
        if(existingUser != null){
            throw new UserAlreadyExistsException("User already exists.");
        }
        User saved = userRepo.save(user);
        return Usermapper.mapToUserDTO(saved);
    }


    // Authenticates a user based on provided login details.
    @Override
    public LoginDTO loginUser(LoginDTO loginDTO) {
        User existingUser = userRepo.findByEmail(loginDTO.getEmail());
        if (existingUser == null) {

            logger.warn("Login failed - No user found with email: {}", loginDTO.getEmail());
            throw new UserNotFoundException("User not found");
        }
        if(passwordEncoder.matches(loginDTO.getPassword(),(existingUser.getPassword()))){
            return Usermapper.mapToLoginDTO(existingUser);
        }
        logger.error("Login failed - Incorrect email or password for email: {}", loginDTO.getEmail());
        throw new IncorrectEmailOrPassword("Incorrect email or Password");
    }

    @Override
     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      User user = userRepo.findByEmail(email);
      if(user!=null){
          UserDetails userDetails = UserPrinciple.build(user);
          return userDetails;
      }
        throw new UserNotFoundException("User not found for the email: "+email);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users=userRepo.findAll();
        return users.stream().map(Usermapper::mapToUserDTO).collect(Collectors.toList());
    }
    public TokenDTO makeTokenDto(User user, String token) {
        User existingUser = userRepo.findByEmail(user.getEmail());
        return new TokenDTO(existingUser.getUserId(), existingUser.getUserRole(), token);
    }

}

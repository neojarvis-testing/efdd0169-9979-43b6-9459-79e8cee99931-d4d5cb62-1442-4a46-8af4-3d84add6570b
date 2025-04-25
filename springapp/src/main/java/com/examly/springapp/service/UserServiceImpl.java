package com.examly.springapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.IncorrectEmailOrPassword;
import com.examly.springapp.exceptions.UserAlreadyExistsException;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.LoginResponse;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo urepo,PasswordEncoder passwordEncoder) {
        this.userRepo = urepo;
        this.passwordEncoder=passwordEncoder;
    }
    /**
     * Registers a new user in the system.
     * @param user The User object containing details such as email and password.
     * @return The saved User object with an encoded password.
     * @throws UserAlreadyExistsException If a user with the same email already exists.
     */
    @Override
    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            logger.warn("User already exists with email: {}", user.getEmail());
            throw new UserAlreadyExistsException("User with this email already exists!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);
        logger.info("User successfully created with ID: {}", savedUser.getUserId());
        return savedUser;
    }

    /**
     * Authenticates a user based on provided login details.
     * @param loginDTO The login credentials containing email and password.
     * @return A LoginResponse containing user details and a dummy authentication token.
     * @throws IncorrectEmailOrPassword If the email or password is incorrect.
     */
    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        User existingUser = userRepo.findByEmail(loginDTO.getEmail());
        if (existingUser == null) {
            logger.warn("Login failed - No user found with email: {}", loginDTO.getEmail());
            return null;
        }
        if (loginDTO.getPassword().equals(existingUser.getPassword())) {
            String token = "dummy-token";
            logger.info("Login successful for user: {}", existingUser.getUsername());
            return new LoginResponse(existingUser.getUserId().intValue(), existingUser.getUserRole(), token,
                    existingUser.getUsername());
        }
        logger.error("Login failed - Incorrect email or password for email: {}", loginDTO.getEmail());
        throw new IncorrectEmailOrPassword("Incorrect email or Password"); // exception is not found

    }

}

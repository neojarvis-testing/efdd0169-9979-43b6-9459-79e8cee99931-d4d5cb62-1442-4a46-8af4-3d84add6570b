package com.examly.springapp.service;

import java.util.List;
import java.util.stream.Collectors;

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

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    // Constructor-based dependency injection
    public UserServiceImpl(UserRepo urepo, PasswordEncoder passwordEncoder) {
        this.userRepo = urepo;
        this.passwordEncoder = passwordEncoder;
    }

    // Registers a new user in the system.
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        log.info("Creating user with email: {}", userDTO.getEmail());

        User user = Usermapper.mapToUser(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User existingUser = userRepo.findByEmail(userDTO.getEmail());
        if (existingUser != null) {
            log.warn("User with email {} already exists.", userDTO.getEmail());
            throw new UserAlreadyExistsException("User already exists.");
        }

        User saved = userRepo.save(user);
        log.info("User with email {} created successfully.", userDTO.getEmail());

        return Usermapper.mapToUserDTO(saved);
    }

    // Authenticates a user based on provided login details.
    @Override
    public LoginDTO loginUser(LoginDTO loginDTO) {
        User existingUser = userRepo.findByEmail(loginDTO.getEmail());
        if (existingUser == null) {

            log.warn("Login failed - No user found with email: {}", loginDTO.getEmail());
            throw new UserNotFoundException("User not found");
        }
        if (passwordEncoder.matches(loginDTO.getPassword(), (existingUser.getPassword()))) {
            return Usermapper.mapToLoginDTO(existingUser);
        }
        log.error("Login failed - Incorrect email or password for email: {}", loginDTO.getEmail());
        throw new IncorrectEmailOrPassword("Incorrect email or Password");
    }
    
    // Load user details by email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    log.info("Attempting to load user by email: {}", email);
    
        User user = userRepo.findByEmail(email);

        if (user != null) {
            log.info("User found for email: {}", email);
            UserDetails userDetails = UserPrinciple.build(user);
            return userDetails;
        }
    
        log.warn("User not found for email: {}", email);
        throw new UserNotFoundException("User not found for the email: " + email);
    }
    
    // Retrieve all users
    @Override
    public List<UserDTO> getAllUsers() {
        log.info("Fetching all users from the database.");

        List<User> users = userRepo.findAll();

        log.info("Successfully fetched {} users.", users.size());

        return users.stream().map(Usermapper::mapToUserDTO).collect(Collectors.toList());
    }

    // Create a TokenDTO for the user
    @Override
    public TokenDTO makeTokenDto(User user, String token) {
        log.info("Creating TokenDTO for user with email: {}", user.getEmail());

        User existingUser = userRepo.findByEmail(user.getEmail());

        log.info("User found with ID: {}", existingUser.getUserId());

        return new TokenDTO(existingUser.getUserId(), existingUser.getUserRole(), token);
    }

}

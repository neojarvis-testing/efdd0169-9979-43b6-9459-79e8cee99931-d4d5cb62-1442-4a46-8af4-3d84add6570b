package com.examly.springapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.IncorrectEmailOrPassword;
import com.examly.springapp.exceptions.UserAlreadyExistsException;
import com.examly.springapp.exceptions.UserNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.examly.springapp.model.LoginDTO;


import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDTO;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.utility.Usermapper;


@Service
public class UserServiceImpl implements UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepo urepo,PasswordEncoder passwordEncoder) {
        this.userRepo = urepo;
        this.passwordEncoder=passwordEncoder;
    }
<<<<<<< HEAD

    @Autowired
    PasswordEncoder passwordEncoder;

    // Registers a new user in the system.
=======
    /**
     * Registers a new user in the system.
     * @param user The User object containing details such as email and password.
     * @return The saved User object with an encoded password.
     * @throws UserAlreadyExistsException If a user with the same email already exists.
     */
>>>>>>> d7417fafa2fc3522a7c161096108401980283a7f
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = Usermapper.mapToUser(userDTO);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User existingUser =userRepo.findByEmail(userDTO.getEmail());
        if(existingUser != null){
            throw new UserNotFoundException("User already exists.");
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
<<<<<<< HEAD
        logger.error("Login failed - Incorrect email or password for email: {}", loginDTO.getEmail());
        throw new IncorrectEmailOrPassword("Incorrect email or Password");
=======
        throw new IncorrectEmailOrPassword("Incorrect email or Password"); // exception is not found

>>>>>>> d7417fafa2fc3522a7c161096108401980283a7f
    }
}

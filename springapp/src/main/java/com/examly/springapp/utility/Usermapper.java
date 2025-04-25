package com.examly.springapp.utility;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDTO;

public class Usermapper {
    public static UserDTO mapToUserDTO(User user){
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setMobileNumber(user.getMobileNumber());
        userDTO.setUsername(user.getUsername());
        userDTO.setUserRole(user.getUserRole());
        userDTO.setPassword(user.getPassword());
        return userDTO;
    }  
     
    public static User mapToUser(UserDTO userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setUsername(userDTO.getUsername());
        user.setUserRole(userDTO.getUserRole());
        user.setPassword(userDTO.getPassword());
    return user;
    }  
    public static LoginDTO mapToLoginDTO(User user){
        String token="token";
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setToken(token);
        loginDTO.setPassword(user.getPassword());
        loginDTO.setEmail(user.getEmail());
        loginDTO.setUserRole(user.getUserRole());
        return loginDTO;
    }
}

package com.examly.springapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequestDTO {
    
    @Email(message="Email should be valid")
    @NotBlank(message="Email is mandatory")

    private String email;

    @NotBlank(message="Password is mandatory")
    @Size(min=8, message="Password should be at least 8 characters long")
    private String password;

    private String userRole;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    

}

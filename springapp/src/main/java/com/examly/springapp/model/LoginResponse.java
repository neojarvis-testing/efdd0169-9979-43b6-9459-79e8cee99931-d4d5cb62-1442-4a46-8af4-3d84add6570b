package com.examly.springapp.model;

public class LoginResponse {
    private int userId;
    private String userRole;
    private String token;
    private String username;

    public LoginResponse() {
    }
 
    public LoginResponse(int userId, String userRole, String token, String username) {
        this.userId = userId;
        this.userRole = userRole;
        this.token = token;
        this.username= username;
    }
 
    public int getUserId() {
        return userId;
    }
 
    public void setUserId(int userId) {
        this.userId = userId;
    }
 
    public String getToken() {
        return token;
    }
 
    public void setToken(String token) {
        this.token = token;
    }
 
    public String getUserRole() {
        return userRole;
    }
 
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
 
    @Override
    public String toString() {
        return "LoginResponse [userId=" + userId + ", token=" + token + "]";
    }

    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
}

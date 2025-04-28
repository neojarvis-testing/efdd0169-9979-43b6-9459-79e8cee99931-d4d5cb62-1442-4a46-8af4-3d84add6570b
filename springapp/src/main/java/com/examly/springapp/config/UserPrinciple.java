package com.examly.springapp.config;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springapp.model.User;

public class UserPrinciple implements UserDetails{
    private User user;
    // Initialize the UserPrinciple object with the given User instance
    public UserPrinciple(User user) {
        this.user = user;
    }

    // Create and return a new UserPrinciple instance using the given User object
    public static UserDetails build(User user) {
       return new UserPrinciple(user);
    }

    // Return the user's role as a collection of GrantedAuthority
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(()->"ROLE_"+user.getUserRole());
    }

    // Retrieve the user's password from the User object
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    // Retrieve the user's email (username) from the User object
    @Override
    public String getUsername() {
        return user.getEmail();
    }
    // Indicate that the account is not expired
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // Indicate that the account is not locked
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    // Indicate that the credentials are not expired
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    // Indicate that the account is enabled
    @Override
    public boolean isEnabled() {
        return true;
    }
}
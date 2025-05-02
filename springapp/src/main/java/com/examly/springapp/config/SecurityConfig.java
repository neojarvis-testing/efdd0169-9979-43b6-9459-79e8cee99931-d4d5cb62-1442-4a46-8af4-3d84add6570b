package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

@Autowired
JwtAuthenticationEntryPoint entryPoint; // Custom entry point for handling unauthorized access

@Autowired
UserDetailsService userDetailsService;

@Autowired
PasswordEncoder encoder;

@Autowired
JwtAuthenticationFilter filter;

@Autowired

// Method to configure the AuthenticationManager with user details and password encoder
public void configure(AuthenticationManagerBuilder authority)throws Exception{
    authority.userDetailsService(userDetailsService).passwordEncoder(encoder);
}
@Bean
public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception{
    return http.getSharedObject(AuthenticationManagerBuilder.class)
    .userDetailsService(userDetailsService)
    .passwordEncoder(encoder)
    .and()
    .build();
}
@Bean
public SecurityFilterChain cFilterChain(HttpSecurity http)throws Exception{
    final String LOAN_APPLICATION_PATH = "/api/loanapplication/{loanapplicationId}";
     http.cors(cors->cors.disable())
    .csrf(csrf->csrf.disable()) // Disables CSRF protection (not needed for token-based authentication)
    .authorizeHttpRequests(auth->auth  // Defines access rules for specific endpoints
    .requestMatchers("/api/register","/api/login","/api/loan","/api/feedback","/api/actuator/**").permitAll() // Allows public access to these endpoints
    .requestMatchers(HttpMethod.GET,LOAN_APPLICATION_PATH,"/api/feedback/{id}").hasAnyRole("ADMIN","USER") // Accessible by both ADMIN and USER roles
    .requestMatchers(HttpMethod.GET,"/api/loan/{loanId}","/api/loanapplication").hasRole("ADMIN")
    .requestMatchers(HttpMethod.PUT,"/api/loan/{loanId}",LOAN_APPLICATION_PATH).hasRole("ADMIN")
    .requestMatchers(HttpMethod.POST,"/api/loan").hasRole("ADMIN") 
    .requestMatchers(HttpMethod.DELETE,"/api/loan/{loanId}").hasRole("ADMIN")
    .requestMatchers(HttpMethod.POST,"/api/loanapplication","/api/feedback/{userId}").hasRole("USER")
    .requestMatchers(HttpMethod.GET,"/api/loanapplication/user/{userId}","/api/feedback/user/{userId}").hasRole("USER")
    .requestMatchers(HttpMethod.DELETE,LOAN_APPLICATION_PATH,"/api/feedback/{id}").hasRole("USER")
    // .anyRequest().authenticated())
    .anyRequest().permitAll()) // Allows unrestricted access to all other requests
    .exceptionHandling(exception -> exception.authenticationEntryPoint(entryPoint)) // Specifies custom entry point for unauthorized access
    .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class); // Adds custom JWT filter before standard authentication filter
    return http.build(); // Builds and returns the security filter chain

}
}

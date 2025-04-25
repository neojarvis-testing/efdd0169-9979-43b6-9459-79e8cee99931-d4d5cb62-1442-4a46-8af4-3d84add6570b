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
JwtAuthenticationEntryPoint entryPoint;

@Autowired
UserDetailsService userDetailsService;

@Autowired
PasswordEncoder encoder;

@Autowired
JwtAuthenticationFilter filter;

@Autowired
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
     http.cors(cors->cors.disable())
    .csrf(csrf->csrf.disable())
    .authorizeHttpRequests(auth->auth
    .requestMatchers("/api/register","/api/login").permitAll()
    .requestMatchers(HttpMethod.GET,"/api/loanapplication/{loanapplicationId}","/api/feedback/{id}").hasAnyRole("ADMIN","USER")
    .requestMatchers(HttpMethod.GET,"/api/loan/{loanId}","/api/loanapplication").hasRole("ADMIN")
    .requestMatchers(HttpMethod.PUT,"/api/loan/{loanId}","/api/loanapplication/{loanapplicationId}").hasRole("ADMIN")
    .requestMatchers(HttpMethod.POST,"/api/loan").hasRole("ADMIN")
    .requestMatchers(HttpMethod.DELETE,"/api/loan/{loanId}").hasRole("ADMIN")
    .requestMatchers(HttpMethod.POST,"/api/loanapplication","/api/feedback/{userId}").hasRole("USER")
    .requestMatchers(HttpMethod.GET,"/api/loanapplication/user/{userId}","/api/feedback/user/{userId}").hasRole("USER")
    .requestMatchers(HttpMethod.DELETE,"/api/loanapplication/{loanapplicationId}","/api/feedback/{id}").hasRole("USER")
    .anyRequest().authenticated())
    .exceptionHandling(exception->exception.authenticationEntryPoint(entryPoint))
    .addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
}
}
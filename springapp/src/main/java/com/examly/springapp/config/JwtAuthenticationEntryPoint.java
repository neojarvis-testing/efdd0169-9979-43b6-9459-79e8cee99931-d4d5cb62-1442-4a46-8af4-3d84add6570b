package com.examly.springapp.config;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component   //registers this class as a spring component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint { //implements authentication failure handling

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
            response.sendError(HttpServletResponse.SC_FORBIDDEN,"Unauthorized"); //Sends 403 forbidden error
    }
    

}
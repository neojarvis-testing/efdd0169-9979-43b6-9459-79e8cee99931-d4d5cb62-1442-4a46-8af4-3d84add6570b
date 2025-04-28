package com.examly.springapp.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.examly.springapp.service.UserServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component //registers this class as a spring component
public class JwtAuthenticationFilter extends OncePerRequestFilter{ //Custom filter for JWT Authentication
    @Autowired
    JwtUtils jwtUtils; //Injects JWT utility class
    @Autowired
    UserServiceImpl service; //Injects user service for loading User details
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException { //processes authentication for each request
        String token =jwtUtils.extractToken(request); //Extract JWT token from request
        if(token!=null&& jwtUtils.validateToken(token)){ //validates token before proceeding
            String username = jwtUtils.extractUsername(token); //extracts user name from token
            System.out.println("Name from token:"+username); //logs extracted username
            UserDetails userDetails = service.loadUserByUsername(username); //loads user details from database
            System.out.println("data found "+ userDetails); //logs loaded user details
            UsernamePasswordAuthenticationToken authenticationToken = 
            new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities()); //creates authentication token
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); //sets authentication details
            SecurityContextHolder.getContext().setAuthentication(authenticationToken); //stores authentication in security context
    }
    filterChain.doFilter(request, response); //continues request processing.
}

}
 

              
                      
        
        
    
package com.examly.springapp.config;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {
    @Value("${secretKey}")// in application property add SECRET_KEY
     private String secretKey;
    public String genrateToken(Authentication authentication) {
          UserDetails userDetails = (UserDetails) authentication.getPrincipal();
          return Jwts.builder()
          .setSubject(userDetails.getUsername())   // Set username as the token subject
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis()+(5*60*60*1000)))     // Set the token expiration time to 30 minutes from now
          .signWith(SignatureAlgorithm.HS256,secretKey)
          .compact();

    }
    // Use the secret key to validate the token,// Retrieve the subject (username) from the claims
    public String extractUsername(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }


    public Date extractExperation(String token){   // Use the secret key to validate the token

        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getExpiration();    // Retrieve the expiration date from the claims
    }


    public boolean isTokenExpired(String token){
        Date expire = extractExperation(token);  
        return expire.before(new Date());
    }
    
    // Retrieve the "Authorization" header from the HTTP request
    public String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if(header!=null && header.startsWith("Bearer ")){   // Extract the token by removing the "Bearer " prefix
            return header.substring(7);
        }
        return null;
    }

    // Return true if the token is not expired
    public boolean validateToken(String token) {
         return !isTokenExpired(token);
    }
}
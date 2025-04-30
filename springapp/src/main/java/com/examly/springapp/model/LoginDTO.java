package com.examly.springapp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
	
	@Email(message="Email should be valid")
	@NotBlank(message="Email is mandatory")
    private String email;
	
	@NotBlank(message="Password is mandatory")
	@Size(min=8,message="Password should be at least 8 characters long")
    private String password;
	
    private String userRole;
	private String token;
}

package com.examly.springapp.config;
 
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
 
@Configuration
public class SwaggerConfig {

    // Bean that configures the OpenAPI object for Swagger documentation
    @Bean
    public OpenAPI openAPI(){
        return new OpenAPI()
                .info(new Info()
                    .title("FARM AID")
                    .version("1.0.0")
                    .contact(new Contact()
                        .name("Contact Us")
                        .email("abc@gmail.com")
                        .url("#"))
                    .description("Farmer friendly loans"))
                .addSecurityItem(new SecurityRequirement()
                    .addList("Bearer Authentication"))
                .components(new Components()
                    .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
    }
    // Method to create and configure the "Bearer Authentication" security scheme
    private SecurityScheme createAPIKeyScheme(){
        return new SecurityScheme()
            .type(SecurityScheme.Type.HTTP) // Specifies HTTP authentication mechanism
            .bearerFormat("JWT") // Specifies the format of the authentication token (JWT)
            .scheme("bearer"); // Specifies HTTP authentication mechanism
    }
}


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
                .info(new Info()  // The info() method provides metadata such as the title, version, and description of the API, along with contact information.
                    .title("FARM AID") // Title of the API documentation
                    .version("1.0.0") // Version number of the API
                    .contact(new Contact() // Contact details for API support
                        .name("Demo API Support") // Name of the support contact
                        .email("abc@gmail.com") // Email of the support contact
                        .url("#")) // URL for additional information
                    .description("Farmer friendly loans")) // Description of the API
                .addSecurityItem(new SecurityRequirement()  // Adding security requirements
                    .addList("Bearer Authentication")) // Specifying that "Bearer Authentication" is required
                .components(new Components() // Adding reusable components
                    .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme())); // Defining security scheme for Bearer Token
    }
    // Method to create and configure the "Bearer Authentication" security scheme
    private SecurityScheme createAPIKeyScheme(){
        return new SecurityScheme()
            .type(SecurityScheme.Type.HTTP) // Specifies HTTP authentication mechanism
            .bearerFormat("JWT") // Specifies the format of the authentication token (JWT)
            .scheme("bearer"); // Specifies HTTP authentication mechanism
    }
}


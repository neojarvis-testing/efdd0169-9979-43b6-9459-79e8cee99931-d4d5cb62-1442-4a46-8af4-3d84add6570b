package com.examly.springapp.model;
import java.time.LocalDate;
 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplicationDTO {
    
    private LocalDate submissionDate;
    private String loanStatus;
    @NotBlank(message="Location must not be blank")
    private String farmLocation;
    @NotBlank(message="Address must not be blank")
    private String farmerAddress;
    @NotNull(message="Farm Size Acres must not be blank")
    private double farmSizeInAcres;
    @NotBlank(message="Purpose must not be blank")
    private String farmpurpose;
    private String file;
    private User user;
    private Loan loan;

}

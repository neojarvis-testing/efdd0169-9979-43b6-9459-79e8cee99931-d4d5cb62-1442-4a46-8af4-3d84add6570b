package com.examly.springapp.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDTO {

    @NotBlank(message ="Loan must not be empty")
    private String loanType;
    @NotBlank(message = "Description must not be empty")
    private String description;
    @NotNull(message = "InterestRate must not be empty")
    private double interestRate;
    @NotNull(message = "Amount must not be empty")
    private double maximumAmount;
    @NotNull(message = "repayment must not be empty")
    private int repaymentTenure;
    private String eligibility;
    private String documentsRequired;
}

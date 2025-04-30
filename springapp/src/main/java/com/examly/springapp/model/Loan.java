package com.examly.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Loan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loanId;
    private String loanType;
    private String description;
    private double interestRate;
    private double maximumAmount;
    private int repaymentTenure;
    private String eligibility;
    private String documentsRequired;
    private boolean avail;
}

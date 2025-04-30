package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long loanApplicationId;
    private LocalDate submissionDate;
    private String loanStatus;
    private String farmLocation;
    private String farmerAddress;
    private double farmSizeInAcres;
    private String farmpurpose;
    @Lob
    private String file;
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
    @ManyToOne
    @JoinColumn(name="loanId")
    private Loan loan;
}

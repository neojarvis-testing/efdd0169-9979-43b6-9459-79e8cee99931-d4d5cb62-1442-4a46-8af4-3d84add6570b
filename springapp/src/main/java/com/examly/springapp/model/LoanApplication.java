package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity
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
    public Long getLoanApplicationId() {
        return loanApplicationId;
    }
    public void setLoanApplicationId(Long loanApplicationId) {
        this.loanApplicationId = loanApplicationId;
    }
    public LocalDate getSubmissionDate() {
        return submissionDate;
    }
    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }
    public String getLoanStatus() {
        return loanStatus;
    }
    public void setLoanStatus(String loanStatus) {
        this.loanStatus = loanStatus;
    }
    public String getFarmLocation() {
        return farmLocation;
    }
    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }
    public String getFarmerAddress() {
        return farmerAddress;
    }
    public void setFarmerAddress(String farmerAddress) {
        this.farmerAddress = farmerAddress;
    }
    public double getFarmSizeInAcres() {
        return farmSizeInAcres;
    }
    public void setFarmSizeInAcres(double farmSizeInAcres) {
        this.farmSizeInAcres = farmSizeInAcres;
    }
    public String getFarmpurpose() {
        return farmpurpose;
    }
    public void setFarmpurpose(String farmpurpose) {
        this.farmpurpose = farmpurpose;
    }
    public String getFile() {
        return file;
    }
    public void setFile(String file) {
        this.file = file;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Loan getLoan() {
        return loan;
    }
    public void setLoan(Loan loan) {
        this.loan = loan;
    }
    public LoanApplication() {
    }
    public LoanApplication(Long loanApplicationId, LocalDate submissionDate, String loanStatus, String farmLocation,
            String farmerAddress, double farmSizeInAcres, String farmpurpose, String file, User user, Loan loan) {
        this.loanApplicationId = loanApplicationId;
        this.submissionDate = submissionDate;
        this.loanStatus = loanStatus;
        this.farmLocation = farmLocation;
        this.farmerAddress = farmerAddress;
        this.farmSizeInAcres = farmSizeInAcres;
        this.farmpurpose = farmpurpose;
        this.file = file;
        this.user = user;
        this.loan = loan;
    }
    
    
    
    

}

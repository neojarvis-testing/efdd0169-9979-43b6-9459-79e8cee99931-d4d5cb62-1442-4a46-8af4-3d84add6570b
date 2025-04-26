package com.examly.springapp.model;
import java.time.LocalDate;
 
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
 
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
     
}

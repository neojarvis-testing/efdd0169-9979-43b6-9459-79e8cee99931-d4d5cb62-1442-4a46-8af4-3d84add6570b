package com.examly.springapp.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
    public String getLoanType() {
        return loanType;
    }
    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public double getInterestRate() {
        return interestRate;
    }
    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }
    public double getMaximumAmount() {
        return maximumAmount;
    }
    public void setMaximumAmount(double maximumAmount) {
        this.maximumAmount = maximumAmount;
    }
    public int getRepaymentTenure() {
        return repaymentTenure;
    }
    public void setRepaymentTenure(int repaymentTenure) {
        this.repaymentTenure = repaymentTenure;
    }
    public String getEligibility() {
        return eligibility;
    }
    public void setEligibility(String eligibility) {
        this.eligibility = eligibility;
    }
    public String getDocumentsRequired() {
        return documentsRequired;
    }
    public void setDocumentsRequired(String documentsRequired) {
        this.documentsRequired = documentsRequired;
    }
    
    
}

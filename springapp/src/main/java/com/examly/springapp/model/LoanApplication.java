package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LoanApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long loanApplicationId;
    private LocalDate submissionDate;
    private int loanStatus;
    private String farmLocation;
    private String farmerAddress;
    private double farmSizeInAcres;
    private String farmpurpose;
    private String file;
    
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
	public int getLoanStatus() {
		return loanStatus;
	}
	public void setLoanStatus(int loanStatus) {
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
}

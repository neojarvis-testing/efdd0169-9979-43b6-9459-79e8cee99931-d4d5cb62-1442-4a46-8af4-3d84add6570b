package com.examly.springapp.utility;

import java.time.LocalDate;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.LoanApplicationDTO;

public class LoanApplicationMappers {

    private LoanApplicationMappers() {
        throw new UnsupportedOperationException("Utility class");
     }

    public static LoanApplicationDTO mapToLoanApplicationDTO(LoanApplication loanApplication) {
        LoanApplicationDTO loanDTO = new LoanApplicationDTO();
        loanDTO.setSubmissionDate(loanApplication.getSubmissionDate());
        loanDTO.setFarmLocation(loanApplication.getFarmLocation());
        loanDTO.setFarmSizeInAcres(loanApplication.getFarmSizeInAcres());
        loanDTO.setFarmerAddress(loanApplication.getFarmerAddress());
        loanDTO.setFile(loanApplication.getFile());
        loanDTO.setLoanStatus(loanApplication.getLoanStatus());
        loanDTO.setFarmpurpose(loanApplication.getFarmpurpose());
        loanDTO.setUserId(loanApplication.getUser().getUserId());
        loanDTO.setLoanId(loanApplication.getLoan().getLoanId());
        // loanDTO.setLoan(loanApplication.getLoan());
        // loanDTO.setUser(loanApplication.getUser());
        return loanDTO;
    }

    public static LoanApplication mapToLoanApplication(LoanApplicationDTO loanApplicationDTO) {
        LoanApplication loan = new LoanApplication();
        loan.setSubmissionDate(LocalDate.now());
        loan.setFarmLocation(loanApplicationDTO.getFarmLocation());
        loan.setFarmSizeInAcres(loanApplicationDTO.getFarmSizeInAcres());
        loan.setFarmerAddress(loanApplicationDTO.getFarmerAddress());
        loan.setFile(loanApplicationDTO.getFile());
        loan.setLoanStatus(loanApplicationDTO.getLoanStatus());
        loan.setFarmpurpose(loanApplicationDTO.getFarmpurpose());
        // loan.setLoan(loanApplicationDTO.getLoan());
        // loan.setUser(loanApplicationDTO.getUser());
        return loan;

    }

}

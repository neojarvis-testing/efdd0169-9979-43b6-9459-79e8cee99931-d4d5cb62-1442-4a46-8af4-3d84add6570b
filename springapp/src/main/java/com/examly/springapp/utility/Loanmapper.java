package com.examly.springapp.utility;

import com.examly.springapp.model.Loan;
import com.examly.springapp.model.LoanDTO;

public class Loanmapper {

    public static LoanDTO mapToLoanDTO(Loan loan){
        LoanDTO loanDTO=new LoanDTO();
        loanDTO.setLoanType(loan.getLoanType());
        loanDTO.setDescription(loan.getDescription());
        loanDTO.setInterestRate(loan.getInterestRate());
        loanDTO.setMaximumAmount(loan.getMaximumAmount());
        loanDTO.setRepaymentTenure(loan.getRepaymentTenure());
        loanDTO.setDocumentsRequired(loan.getDocumentsRequired());
        loanDTO.setEligibility(loan.getEligibility());
        return loanDTO;
    }

    public static Loan mapToLoan(LoanDTO loanDTO){
        Loan loan =new Loan();
        loan.setLoanType(loanDTO.getLoanType());
        loan.setDescription(loanDTO.getDescription());
        loan.setInterestRate(loanDTO.getInterestRate());
        loan.setMaximumAmount(loanDTO.getMaximumAmount());
        loan.setRepaymentTenure(loanDTO.getRepaymentTenure());
        loan.setDocumentsRequired(loanDTO.getDocumentsRequired());
        loan.setEligibility(loanDTO.getEligibility());
        return loan;

    }

}

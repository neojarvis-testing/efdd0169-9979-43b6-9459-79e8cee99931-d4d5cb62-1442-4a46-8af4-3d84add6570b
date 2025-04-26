package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Loan;
import com.examly.springapp.model.LoanDTO;

public interface LoanService {

    LoanDTO addLoan(LoanDTO loanDTO);

    Loan getLoanById(Long loanId);

    List<Loan> getAllLoans();

    LoanDTO updateLoan(Long loanId, LoanDTO loanDTO);

    Loan deleteLoan(Long loanId);

    // Map<String, Object> getMonthlyLoanData();

    // Map<String, Integer> getLoanStatus();

}

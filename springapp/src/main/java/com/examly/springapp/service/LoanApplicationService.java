package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.LoanApplicationDTO;

public interface LoanApplicationService {

    public LoanApplication addLoanApplication(LoanApplication loanApplication);

    public List<LoanApplication> getLoanApplicationByUserId(Long userId);

    public List<LoanApplication> getAllLoanAplications();

    public LoanApplicationDTO updateLoanApplication(long loanApplicationId, LoanApplicationDTO loanApplicationDTO);

    public boolean deleteLoanApplication(long loanApplicationId);
    
}

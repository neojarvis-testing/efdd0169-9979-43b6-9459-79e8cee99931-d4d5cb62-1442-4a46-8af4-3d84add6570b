package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.repository.UserRepo;
@Service
public class LoanApplicationServiceImpl implements LoanApplicationService{
    @Autowired
    LoanApplicationRepo loanApplicationRepo;

    @Autowired
    UserRepo userRepo;

    public LoanApplication addLoanApplication(LoanApplication loanApplication) {
        return loanApplicationRepo.save(loanApplication);
        
    }

    public LoanApplication getLoanApplicationById(long loanApplicationId) {
       return loanApplicationRepo.findById(loanApplicationId).orElse(null);
        
    }

    public List<LoanApplication> getAllLoanAplications() {
        return loanApplicationRepo.findAll();
    }

    public LoanApplication updateLoanApplication(long loanApplicationId, LoanApplication updatedLoanApplication) {
        LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if(loanApplication == null){
            return null;
        }    
        updatedLoanApplication.setLoanApplicationId(loanApplicationId);
        return loanApplicationRepo.save(updatedLoanApplication);
    }

    public boolean deleteLoanApplication(long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if(loanApplication==null){
            return false;
        }
        loanApplicationRepo.delete(loanApplication);
        return true;
    }

    public List<LoanApplication> getLoanAplicationByUserId(Long userId) {
        return loanApplicationRepo.getLoanApplicationByApplicationId(userId);
    }

}

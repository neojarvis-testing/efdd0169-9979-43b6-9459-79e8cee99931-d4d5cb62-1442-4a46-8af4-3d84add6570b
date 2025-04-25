package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.repository.UserRepo;
@Service
public class LoanApplicationServiceImpl implements LoanApplicationService{
    
    private final LoanApplicationRepo loanApplicationRepo;
    public LoanApplicationServiceImpl(LoanApplicationRepo loanApplicationRepo){
        this.loanApplicationRepo=loanApplicationRepo;
    }

    public LoanApplication addLoanApplication(LoanApplication loanApplication) {
        loanApplication.setSubmissionDate(LocalDate.now());
        loanApplication.setLoanStatus(1);
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

    @Override
    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getLoanApplicationByUserId'");
    }

}

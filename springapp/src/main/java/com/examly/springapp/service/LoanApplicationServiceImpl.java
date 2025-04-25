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

    // public LoanApplication updateLoanApplication(long loanApplicationId, LoanApplication updatedLoanApplication) {
    //     LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
    //     if(loanApplication == null){
    //         return null;
    //     }    
    //     updatedLoanApplication.setLoanApplicationId(loanApplicationId);
    //     return loanApplicationRepo.save(updatedLoanApplication);
    // }

    public LoanApplication updateLoanApplication(long loanApplicationId, LoanApplication updatedLoanApplication) {
        LoanApplication existingLoanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if (existingLoanApplication == null) {
            System.out.println("Loan application with ID " + loanApplicationId + " not found.");
            return null;
        }
        updatedLoanApplication.setLoanApplicationId(loanApplicationId);
        LoanApplication savedLoanApplication = loanApplicationRepo.save(updatedLoanApplication);
        System.out.println("Updated loan application: " + savedLoanApplication);
        return savedLoanApplication;
    }
    

    public boolean deleteLoanApplication(long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if(loanApplication==null){
            return false;
        }
        loanApplicationRepo.delete(loanApplication);
        return true;
    }

    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
        return loanApplicationRepo.getLoanApplicationByApplicationId(userId);
    }



}

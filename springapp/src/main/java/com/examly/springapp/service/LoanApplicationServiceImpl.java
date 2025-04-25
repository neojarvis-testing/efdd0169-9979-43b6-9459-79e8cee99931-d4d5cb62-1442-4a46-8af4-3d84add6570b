package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.repository.LoanRepo;
import com.examly.springapp.repository.UserRepo;
@Service
public class LoanApplicationServiceImpl implements LoanApplicationService{
    
    private final LoanApplicationRepo loanApplicationRepo;
    private final LoanRepo loanRepo;
    private final UserRepo userRepo;

    public LoanApplicationServiceImpl(LoanApplicationRepo loanApplicationRepo,LoanRepo loanRepo,UserRepo userRepo){
        this.loanApplicationRepo=loanApplicationRepo;
        this.loanRepo=loanRepo;
        this.userRepo=userRepo;
    }
    


    public LoanApplication addLoanApplication(LoanApplication loanApplication) {

        Loan loan = loanRepo.findById(loanApplication.getLoan().getLoanId()).orElse(null);
        User user=userRepo.findById(loanApplication.getUser().getUserId()).orElse(null);
        if(loan==null || user == null){
           // throw new UserNotFoundException("User or Loan doesn't Exists");
        }
        loanApplication.setSubmissionDate(LocalDate.now());
        loanApplication.setLoanStatus("Applied");
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

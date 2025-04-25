package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DatabaseOperationException;
import com.examly.springapp.exceptions.GenericException;
import com.examly.springapp.exceptions.LoanApplicationNotFoundException;
import com.examly.springapp.exceptions.ResourceNotFoundException;
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
       return loanApplicationRepo.findById(loanApplicationId)
      .orElseThrow(() -> new ResourceNotFoundException("Loan application with ID " + loanApplicationId + " not found."));

        
    }

    public List<LoanApplication> getAllLoanAplications() {
        List<LoanApplication> loanApplications = loanApplicationRepo.findAll();

    if (loanApplications == null || loanApplications.isEmpty()) {
        throw new LoanApplicationNotFoundException("No loan applications found in the database.");
    }

    return loanApplications;

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

     LoanApplication existingLoanApplication = loanApplicationRepo.findById(loanApplicationId)
             .orElseThrow(() -> new ResourceNotFoundException("Loan application with ID " + loanApplicationId + " not found."));
     try {
         updatedLoanApplication.setLoanApplicationId(loanApplicationId);
         return loanApplicationRepo.save(updatedLoanApplication);
     } catch (Exception e) {
         throw new GenericException("Error updating loan application with ID " + loanApplicationId);
     }
    }
    

    public boolean deleteLoanApplication(long loanApplicationId) {
     LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId)
             .orElseThrow(() -> new ResourceNotFoundException("Loan application with ID " + loanApplicationId + " not found."));
     try {
         loanApplicationRepo.delete(loanApplication);
         return true;
        } 
        catch (Exception e) {
         throw new DatabaseOperationException("Failed to delete loan application with ID " + loanApplicationId);
        }
    }

    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
    List<LoanApplication> loanApplications = loanApplicationRepo.getLoanApplicationByApplicationId(userId);

    if (loanApplications == null || loanApplications.isEmpty()) {
        throw new ResourceNotFoundException("No loan applications found for user with ID " + userId);
    }

    return loanApplications;
}

}

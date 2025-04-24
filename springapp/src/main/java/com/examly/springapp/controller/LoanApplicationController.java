package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.User;
import com.examly.springapp.service.LoanApplicationServiceImpl;

@RestController
public class LoanApplicationController {
    @Autowired
    LoanApplicationServiceImpl loanApplicationService;

    @PostMapping("/api/loanapplication")
    public ResponseEntity<LoanApplication> addLoanApplication(@RequestBody LoanApplication loanApplication)
    {
        loanApplication = loanApplicationService.addLoanApplication(loanApplication);
        return ResponseEntity.status(201).body(loanApplication);
    }

    // @GetMapping("/api/loanapplication/{loanApplicationById}")
    // public ResponseEntity<LoanApplication> getLoanApplicationByApplicationId(@PathVariable Long loanApplicationId){
    //     LoanApplication loanApplication = loanApplicationService.getLoanApplicationByApplicationId(loanApplicationId);
    //     if(loanApplication != null){
    //         return ResponseEntity.status(200).body(loanApplication);
    //     }else{
    //         return ResponseEntity.status(404).body(null);
    //     }
    // }

    @GetMapping("/api/loanapplication")
    public ResponseEntity<List<LoanApplication>> getAllLoanAplications(){
        List<LoanApplication> list = loanApplicationService.getAllLoanAplications();
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("/api/loanapplication/user/{userId}")
    public ResponseEntity<List<LoanApplication>> getLoanAplicationByUserId(@PathVariable Long userId){
        List<LoanApplication> list = loanApplicationService.getLoanAplicationByUserId(userId);
        return ResponseEntity.status(200).body(list);
    }

    @PutMapping("/api/loanapplication/{loanApplicationById}")
    public ResponseEntity<LoanApplication> updateLoanApplication(@PathVariable long loanApplicationId, @RequestBody LoanApplication updatedLoanApplication){
        updatedLoanApplication = loanApplicationService.updateLoanApplication(loanApplicationId, updatedLoanApplication);
        return ResponseEntity.status(200).body(updatedLoanApplication);

    }

    @DeleteMapping("/api/loanapplication/{loanApplicationById}")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable long loanApplicationId){
        boolean loanApplication = loanApplicationService.deleteLoanApplication(loanApplicationId);
        return ResponseEntity.status(200).body(loanApplication);
    }




    
}

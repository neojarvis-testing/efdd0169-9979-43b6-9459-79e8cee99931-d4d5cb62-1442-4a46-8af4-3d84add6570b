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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.service.LoanApplicationServiceImpl;

@RestController
@RequestMapping("/api/loanapplication")
public class LoanApplicationController {


    private final LoanApplicationServiceImpl loanApplicationService;

    // Dependency injection of LoanApplicationServiceImpl using constructor-based injection
    public LoanApplicationController(LoanApplicationServiceImpl loanApplicationService) {
        this.loanApplicationService = loanApplicationService;
    }

    // Endpoint to add a new loan application
    @PostMapping("/api/loanapplication")
    public ResponseEntity<LoanApplication> addLoanApplication(@RequestBody LoanApplication loanApplication) {

        loanApplication = loanApplicationService.addLoanApplication(loanApplication);
        return ResponseEntity.status(201).body(loanApplication);    // Return 201 Created status
    }


    // Endpoint to get a loan application by its ID
    @GetMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<LoanApplication> getLoanApplicationByApplicationId(@PathVariable Long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationService.getLoanApplicationById(loanApplicationId);
        if (loanApplication != null) {
            return ResponseEntity.status(200).body(loanApplication);    // Return 200 OK status if found
        } else {
            return ResponseEntity.status(404).body(null);   // Return 404 Not Found status if not found
        }
    }

    // Endpoint to get all loan applications
    @GetMapping("/api/loanapplication")
    public ResponseEntity<List<LoanApplication>> getAllLoanAplications() {

        List<LoanApplication> list = loanApplicationService.getAllLoanAplications();
        return ResponseEntity.status(200).body(list);   // Return 200 OK status with the list of loan applications
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanApplication>> getLoanAplicationByUserId(@PathVariable Long userId){
        List<LoanApplication> list = loanApplicationService.getLoanApplicationByUserId(userId);
        return ResponseEntity.status(200).body(list);
    }

    @PutMapping("/{loanApplicationId}")
    public ResponseEntity<LoanApplication> updateLoanApplication(@PathVariable long loanApplicationId, @RequestBody LoanApplication updatedLoanApplication){
        updatedLoanApplication = loanApplicationService.updateLoanApplication(loanApplicationId, updatedLoanApplication);
        return ResponseEntity.status(200).body(updatedLoanApplication);

    }

    // Endpoint to get loan applications by user ID
    @GetMapping("/api/loanapplication/user/{userId}")
    public ResponseEntity<List<LoanApplication>> getLoanApplicationByUserId(@PathVariable Long userId) {
        List<LoanApplication> list = loanApplicationService.getLoanApplicationByUserId(userId);
        return ResponseEntity.status(200).body(list);   // Return 200 OK status with the list of loan applications for the user
    }

    // Endpoint to update a loan application by its ID
    @PutMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<LoanApplication> updateLoanApplication(@PathVariable long loanApplicationId,
            @RequestBody LoanApplication updatedLoanApplication) {
        updatedLoanApplication = loanApplicationService.updateLoanApplication(loanApplicationId,
                updatedLoanApplication);
        return ResponseEntity.status(200).body(updatedLoanApplication); // Return 200 OK status with the updated loan application

    }

    // Endpoint to delete a loan application by its ID
    @DeleteMapping("/api/loanapplication/{loanApplicationId}")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable long loanApplicationId) {

        boolean loanApplication = loanApplicationService.deleteLoanApplication(loanApplicationId);
        return ResponseEntity.status(200).body(loanApplication);    // Return 200 OK status with the result of the deletion
    }

}

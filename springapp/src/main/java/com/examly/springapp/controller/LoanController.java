package com.examly.springapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Loan;
import com.examly.springapp.service.LoanServiceImpl;

@RestController
@RequestMapping("/api/loan")
public class LoanController {

    private final LoanServiceImpl loanService;

    // Constructor-based injection
    public LoanController(LoanServiceImpl loanService) {
        this.loanService = loanService;
    }

    // Endpoint to add a new loan
    @PostMapping
    public ResponseEntity<Loan> addLoan(@RequestBody Loan loan) {
        Loan createdLoan = loanService.addLoan(loan);
        if (createdLoan != null)
            return ResponseEntity.status(201).body(createdLoan); // Return 201 Created if successful
        return ResponseEntity.status(400).body(null); // Return 400 Bad Request if failed
        // return ResponseEntity.status(400).body(new ErrorResponse("Invalid request"));
    }

    // Endpoint to view a loan by its ID
    @GetMapping("/{loanId}")
    public ResponseEntity<Loan> viewLoanById(@PathVariable Long loanId) {
        Loan loan = loanService.getLoanById(loanId);
        if (loan != null)
            return ResponseEntity.status(200).body(loan); // Return 200 OK if loan is found
        return ResponseEntity.status(404).body(null); // Return 404 Not Found if loan is not found
    }

    // Endpoint to get all loans
    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return ResponseEntity.status(200).body(loans); // Return 200 OK with the list of loans
    }

    // Endpoint to edit an existing loan
    @PutMapping("/{loanId}")
    public ResponseEntity<Loan> editLoan(@PathVariable Long loanId, @RequestBody Loan loanDetails) {
        Loan updatedLoan = loanService.updateLoan(loanId, loanDetails);
        if (updatedLoan != null)
            return ResponseEntity.status(200).body(updatedLoan); // Return 200 OK if update is successful
        return ResponseEntity.status(404).body(null); // Return 404 Not Found if loan is not found
    }

    // Endpoint to delete a loan by its ID
    @DeleteMapping("/{loanId}")
    public ResponseEntity<Loan> deleteLoan(@PathVariable Long loanId) {
        Loan deletedLoan = loanService.deleteLoan(loanId);
        if (deletedLoan != null)
            return ResponseEntity.status(200).body(deletedLoan); // Return 200 OK if deletion is successful
        return ResponseEntity.status(404).body(null); // Return 404 Not Found if loan is not found
    }
}

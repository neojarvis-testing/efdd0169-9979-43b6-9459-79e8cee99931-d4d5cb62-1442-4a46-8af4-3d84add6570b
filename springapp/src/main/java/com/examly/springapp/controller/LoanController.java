package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    LoanServiceImpl loanService;

    @PostMapping
    public ResponseEntity<Loan> addLoan(@RequestBody Loan loan) {
        Loan createdLoan = loanService.addLoan(loan);
        if(createdLoan != null)
            return ResponseEntity.status(201).body(createdLoan);
        return ResponseEntity.status(400).body(null);
    }

    @GetMapping("/{loanId}")
    public ResponseEntity<Loan> viewLoanById(@PathVariable Long loanId) {
        Loan loan = loanService.getLoanById(loanId);
        if(loan != null)
            return ResponseEntity.status(200).body(loan);
        return ResponseEntity.status(404).body(null);
    }

    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        //if(!loans.isEmpty())
            return ResponseEntity.status(200).body(loans);
        //return ResponseEntity.status(404).body(null);
    }

    @PutMapping("/{loanId}")
    public ResponseEntity<Loan> editLoan(@PathVariable Long loanId, @RequestBody Loan loanDetails) {
        Loan updatedLoan = loanService.updateLoan(loanId, loanDetails);
        if(updatedLoan != null)
            return ResponseEntity.status(200).body(updatedLoan);
        return ResponseEntity.status(404).body(null);
    }

    @DeleteMapping("/{loanId}")
    public ResponseEntity<Loan> deleteLoan(@PathVariable Long loanId) {
        Loan deletedLoan = loanService.deleteLoan(loanId);
        if(deletedLoan != null)
            return ResponseEntity.status(200).body(deletedLoan);
        return ResponseEntity.status(404).body(null);
    }

}

package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;

@Service
public class LoanServiceImpl implements LoanService {

    private static final Logger logger = LoggerFactory.getLogger(LoanServiceImpl.class);

    private final LoanRepo loanRepository;

    // Constructor-based dependency injection
    public LoanServiceImpl(LoanRepo loanRepository) {
        this.loanRepository = loanRepository;
    }

    // Method to add a new loan
    @Override
    public Loan addLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    // Method to get a loan by its ID
    @Override
    public Loan getLoanById(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> {
                    logger.error("Loan not found with ID: {}", loanId);
                    return new LoanNotFoundException("Loan not found with ID: " + loanId);
                });
    }

    // Method to get all loans
    @Override
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    // Method to update an existing loan
    @Override
    public Loan updateLoan(Long loanId, Loan updatedLoan) {
        if (loanRepository.existsById(loanId)) {
            updatedLoan.setLoanId(loanId);
            return loanRepository.save(updatedLoan);
        } else {
            logger.error("Loan not found with ID: {}", loanId);
            throw new LoanNotFoundException("Loan not found with ID: " + loanId);
        }
        return null; // replace with exception

    }

    // Method to delete a loan by its ID
    @Override
    public Loan deleteLoan(Long loanId) {
        Optional<Loan> loan = loanRepository.findById(loanId);
        if (loan.isPresent()) {
            loanRepository.deleteById(loanId);
            return loan.get();
        } else {
            logger.error("Loan not found with ID: {}", loanId);
            throw new LoanNotFoundException("Loan not found with ID: " + loanId);
        }
    }
}

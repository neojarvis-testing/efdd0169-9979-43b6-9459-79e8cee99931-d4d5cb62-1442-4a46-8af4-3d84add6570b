package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.LoanNotFoundException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.model.LoanDTO;
import com.examly.springapp.repository.LoanRepo;
import com.examly.springapp.utility.Loanmapper;

@Service
public class LoanServiceImpl implements LoanService {

    private static final Logger logger = LoggerFactory.getLogger(LoanServiceImpl.class);

    private final LoanRepo loanRepository;

    // Constructor-based dependency injection
    public LoanServiceImpl(LoanRepo loanRepository) {
        this.loanRepository = loanRepository;
    }

    // Method to add a new loan.
    @Override
    public LoanDTO addLoan(LoanDTO loanDTO) {
        Loan loan = Loanmapper.mapToLoan(loanDTO);
        loan.setAvail(true);
        Loan saved = loanRepository.save(loan);
        return Loanmapper.mapToLoanDTO(saved);
    }

    // Method to get a loan by its ID.
    @Override
    public Loan getLoanById(Long loanId) {
        logger.info("Fetching loan with ID: {}", loanId);
        return loanRepository.findById(loanId)
                .orElseThrow(() -> {
                    logger.error("Loan not found with ID: {}", loanId);
                    return new LoanNotFoundException("Loan not found with ID: " + loanId);
                });
    }

    // Method to get all loans.
    @Override
    public List<Loan> getAllLoans() {
        logger.info("Fetching all loans...");
        List<Loan> loans = loanRepository.findAll();
        logger.info("Total loans found: {}", loans.size());
        return loans;
    }

    // Method to update an existing loan.
    @Override
    public LoanDTO updateLoan(Long loanId, LoanDTO loanDTO) {
        logger.info("Attempting to update loan with ID: {}", loanId);
        Loan loan = loanRepository.findById(loanId).orElse(null);
        if (loan != null) {
            loan.setLoanId(loanId);
            loan.setLoanType(loanDTO.getLoanType());
            loan.setDescription(loanDTO.getDescription());
            loan.setInterestRate(loanDTO.getInterestRate());
            loan.setMaximumAmount(loanDTO.getMaximumAmount());
            loan.setRepaymentTenure(loanDTO.getRepaymentTenure());
            loan.setDocumentsRequired(loanDTO.getDocumentsRequired());
            loan.setEligibility(loanDTO.getEligibility());
            Loan savedLoan = loanRepository.save(loan);
            logger.info("Loan successfully updated with ID: {}", savedLoan.getLoanId());
            return Loanmapper.mapToLoanDTO(savedLoan);
        } else {
            logger.error("Loan not found with ID: {}", loanId);
            throw new LoanNotFoundException("Loan not found with ID: " + loanId);
        }
    }

    // Method to delete a loan by its ID.
    @Override
    public Loan deleteLoan(Long loanId) {
        logger.info("Attempting to delete loan with ID: {}", loanId);
        Optional<Loan> loan = loanRepository.findById(loanId);
        if (loan.isPresent()) {
            Loan existingLoan = loan.get();
            existingLoan.setAvail(false);
            existingLoan= loanRepository.save(existingLoan);
            loanRepository.deleteById(loanId);
            logger.info("Loan successfully deleted with ID: {}", loanId);
            return existingLoan;
        } else {
            logger.error("Loan not found with ID: {}", loanId);
            throw new LoanNotFoundException("Loan not found with ID: " + loanId);
        }
    }
}

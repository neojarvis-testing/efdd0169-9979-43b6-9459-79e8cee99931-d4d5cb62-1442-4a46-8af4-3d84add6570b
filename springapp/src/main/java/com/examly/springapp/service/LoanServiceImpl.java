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

    public LoanServiceImpl(LoanRepo loanRepository) {
        this.loanRepository = loanRepository;
    }

    @Override
    public Loan addLoan(Loan loan) {
        return loanRepository.save(loan);
    }

    @Override
    public Loan getLoanById(Long loanId) {
        Optional<Loan> loan = loanRepository.findById(loanId);
        return loan.orElse(null);

    }

    @Override
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    @Override
    public Loan updateLoan(Long loanId, Loan updatedLoan) {
        if (loanRepository.existsById(loanId)) {
            updatedLoan.setLoanId(loanId);
            return loanRepository.save(updatedLoan);
        }
        return null;
    }

    @Override
    public Loan deleteLoan(Long loanId) {
        Optional<Loan> loan = loanRepository.findById(loanId);
        if (loan.isPresent()) {
            loanRepository.deleteById(loanId);
            return loan.get();
        }
        return null;
    }

}

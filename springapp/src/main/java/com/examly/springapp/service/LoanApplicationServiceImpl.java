package com.examly.springapp.service;

import com.examly.springapp.exceptions.LoanApplicationNotFoundException;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Loan;

import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.model.LoanApplicationDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.LoanApplicationRepo;
import com.examly.springapp.repository.LoanRepo;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.utility.LoanApplicationMappers;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LoanApplicationServiceImpl implements LoanApplicationService {

    private final LoanApplicationRepo loanApplicationRepo;
    private final LoanRepo loanRepo;
    private final UserRepo userRepo;

    public LoanApplicationServiceImpl(LoanApplicationRepo loanApplicationRepo, LoanRepo loanRepo, UserRepo userRepo) {
        this.loanApplicationRepo = loanApplicationRepo;
        this.loanRepo = loanRepo;
        this.userRepo = userRepo;

    }

    // adds a loan application
    public LoanApplicationDTO addLoanApplication(LoanApplicationDTO loanApplicationDTO) {
        LoanApplication loanApplication = LoanApplicationMappers.mapToLoanApplication(loanApplicationDTO);
        Loan loan = loanRepo.findById(loanApplication.getLoan().getLoanId()).orElse(null);
        User user = userRepo.findById(loanApplication.getUser().getUserId()).orElse(null);

        if (loan == null || user == null) {
            throw new UserNotFoundException("User or Loan does not exist!!");
        }

        loanApplication.setLoan(loan);
        loanApplication.setUser(user);
        loanApplication.setSubmissionDate(LocalDate.now());
        loanApplication.setLoanStatus("Applied");
        LoanApplication saved = loanApplicationRepo.save(loanApplication);
        return LoanApplicationMappers.mapToLoanApplicationDTO(saved);
    }

    // Retrieves a loan application by its ID.
    public LoanApplication getLoanApplicationById(long loanApplicationId) {
        log.info("Fetching loan application with ID {}", loanApplicationId);
        return loanApplicationRepo.findById(loanApplicationId)
                .orElseThrow(() -> {
                    log.error("Loan application with ID {} not found", loanApplicationId);
                    throw new LoanApplicationNotFoundException(
                            "Loan application with ID " + loanApplicationId + " not found.");
                });
    }

    /**
     * Retrieves all loan applications from the database.
     */
    public List<LoanApplication> getAllLoanAplications() {
        log.info("Fetching all loan applications...");
        List<LoanApplication> loanApplications = loanApplicationRepo.findAll();
        if (loanApplications == null || loanApplications.isEmpty()) {
            log.error("No loan applications found in the database.");
            throw new LoanApplicationNotFoundException("No loan applications found in the database.");
        }
        log.info("{} loan applications fetched successfully", loanApplications.size());
        return loanApplications;

    }
    // updated Loan Application by ID

    public LoanApplicationDTO updateLoanApplication(long loanApplicationId, LoanApplicationDTO loanApplicationDTO) {

        LoanApplication loan = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if (loan != null) {
            loan.setLoanApplicationId(loanApplicationId);
            loan.setFarmLocation(loanApplicationDTO.getFarmLocation());
            loan.setFarmSizeInAcres(loanApplicationDTO.getFarmSizeInAcres());
            loan.setFarmerAddress(loanApplicationDTO.getFarmerAddress());
            loan.setFile(loanApplicationDTO.getFile());
            loan.setLoanStatus(loanApplicationDTO.getLoanStatus());
            loan.setFarmpurpose(loanApplicationDTO.getFarmpurpose());
            loan.setLoan(loanApplicationDTO.getLoan());
            loan.setUser(loanApplicationDTO.getUser());
            LoanApplication saved = loanApplicationRepo.save(loan);
            return LoanApplicationMappers.mapToLoanApplicationDTO(saved);

        }
        throw new LoanApplicationNotFoundException("Loan application with ID " + loanApplicationId + " not found.");
    }

    // Deletes a loan application by its ID.
    public boolean deleteLoanApplication(long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if (loanApplication == null) {
            return false;
        }
        loanApplicationRepo.delete(loanApplication);
        return true;
    }

    // Retrieves loan applications associated with a specific user ID.
    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
        log.info("Fetching loan applications for user with ID {}", userId);
        List<LoanApplication> loanApplications = loanApplicationRepo.getLoanApplicationByApplicationId(userId);
        if (loanApplications == null || loanApplications.isEmpty()) {
            log.error("No loan applications found for user with ID {}", userId);
            throw new LoanApplicationNotFoundException("No loan applications found for user with ID " + userId);
        }
        log.info("{} loan applications found for user with ID {}", loanApplications.size(), userId);
        return loanApplications;
    }

}

package com.examly.springapp.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.LoanApplicationNotFoundException;
import com.examly.springapp.model.LoanApplication;
import com.examly.springapp.repository.LoanApplicationRepo;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService {

    // Implementing Logger
    private static final Logger logger = LoggerFactory.getLogger(LoanApplicationServiceImpl.class);

    private final LoanApplicationRepo loanApplicationRepo;

    public LoanApplicationServiceImpl(LoanApplicationRepo loanApplicationRepo) {
        this.loanApplicationRepo = loanApplicationRepo;
    }

    public LoanApplication addLoanApplication(LoanApplication loanApplication) {
        return loanApplicationRepo.save(loanApplication);

    }

    /**
     * Retrieves a loan application by its ID.
     * Logs the process of retrieving the loan application, including handling
     * not-found errors.
     * Throws a ResourceNotFoundException if the loan application does not exist.
     *
     * @param loanApplicationId The unique ID of the loan application to retrieve.
     * @return The loan application object if found.
     * @throws ResourceNotFoundException if no loan application is found for the
     *                                   given ID.
     */

    public LoanApplication getLoanApplicationById(long loanApplicationId) {
        logger.info("Fetching loan application with ID {}", loanApplicationId);
        return loanApplicationRepo.findById(loanApplicationId)
                .orElseThrow(() -> {
                    logger.error("Loan application with ID {} not found", loanApplicationId);
                    throw new LoanApplicationNotFoundException("Loan application with ID " + loanApplicationId + " not found.");
                });
    }

    /**
     * Retrieves all loan applications from the database.
     * Logs the process of fetching loan applications and handles cases where no
     * applications exist.
     * Throws a LoanApplicationNotFoundException if no loan applications are found.
     *
     * @return A list of all loan applications.
     * @throws LoanApplicationNotFoundException if no loan applications are found in
     *                                          the database.
     */
    public List<LoanApplication> getAllLoanAplications() {
        logger.info("Fetching all loan applications...");
        List<LoanApplication> loanApplications = loanApplicationRepo.findAll();
        if (loanApplications == null || loanApplications.isEmpty()) {
            logger.error("No loan applications found in the database.");
            throw new LoanApplicationNotFoundException("No loan applications found in the database.");
        }
        logger.info("{} loan applications fetched successfully", loanApplications.size());
        return loanApplications;

    }

    // public LoanApplication updateLoanApplication(long loanApplicationId,
    // LoanApplication updatedLoanApplication) {
    // LoanApplication loanApplication =
    // loanApplicationRepo.findById(loanApplicationId).orElse(null);
    // if(loanApplication == null){
    // return null;
    // }
    // updatedLoanApplication.setLoanApplicationId(loanApplicationId);
    // return loanApplicationRepo.save(updatedLoanApplication);
    // }

    public LoanApplication updateLoanApplication(long loanApplicationId, LoanApplication updatedLoanApplication) {

        LoanApplication existingLoanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
                if(existingLoanApplication==null){
                    throw new LoanApplicationNotFoundException("Loan application with ID " + loanApplicationId + " not found.");
                }
        updatedLoanApplication.setLoanApplicationId(loanApplicationId);
        return loanApplicationRepo.save(updatedLoanApplication);
    }

    /**
     * Deletes a loan application by its ID.
     * Logs each step of the deletion process, including success and failure cases.
     * Throws a ResourceNotFoundException if the loan application does not exist.
     *
     * @param loanApplicationId The unique ID of the loan application to be deleted.
     * @return true if the deletion is successful, otherwise throws an exception.
     * @throws DatabaseOperationException if an error occurs during deletion.
     */
    public boolean deleteLoanApplication(long loanApplicationId) {
        LoanApplication loanApplication = loanApplicationRepo.findById(loanApplicationId).orElse(null);
        if(loanApplication==null){
            return false;
        }
        loanApplicationRepo.delete(loanApplication);
        return true;
    }


    /**
    * Retrieves loan applications associated with a specific user ID.
    * Logs the process of fetching loan applications and handles cases where no applications are found.
    * Throws a LoanApplicationNotFoundException if no loan applications are available for the specified user ID.
    *
    * @param userId The unique ID of the user whose loan applications are to be fetched.
    * @return A list of loan applications linked to the given user ID.
    * @throws LoanApplicationNotFoundException if no loan applications are found for the user ID.
    */


    public List<LoanApplication> getLoanApplicationByUserId(Long userId) {
        logger.info("Fetching loan applications for user with ID {}", userId);
        List<LoanApplication> loanApplications = loanApplicationRepo.getLoanApplicationByApplicationId(userId);
        if (loanApplications == null || loanApplications.isEmpty()) {
            logger.error("No loan applications found for user with ID {}", userId);
            throw new LoanApplicationNotFoundException("No loan applications found for user with ID " + userId);
        }
        logger.info("{} loan applications found for user with ID {}", loanApplications.size(), userId);
        return loanApplications;
    }

}

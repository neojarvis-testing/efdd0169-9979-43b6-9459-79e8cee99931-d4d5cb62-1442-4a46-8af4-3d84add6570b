package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.LoanApplication;

public interface LoanApplicationRepo extends JpaRepository<LoanApplication,Long>{
    
}

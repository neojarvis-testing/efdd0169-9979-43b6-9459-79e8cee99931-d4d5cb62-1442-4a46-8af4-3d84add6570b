package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;

@Entity
public class Feedback {
    private Long feedbackId;
    private String feedbackText;
    private LocalDate date;
    private User user;
}

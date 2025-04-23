package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Feedback {
    @Id
    private Long feedbackId;
    private String feedbackText;
    private LocalDate date;
    private User user;
}

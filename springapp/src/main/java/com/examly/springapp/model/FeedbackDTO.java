package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;


public class FeedbackDTO {

	private Long feedbackId;
	// @NotBlank(message="Feedback text is mandatory")
    private String feedbackText;
	// @NotBlank(message="Feedback date is mandatory")
	private LocalDate date;
	public Long getFeedbackId() {
		return feedbackId;
	}
	public void setFeedbackId(Long feedbackId) {
		this.feedbackId = feedbackId;
	}
	public String getFeedbackText() {
		return feedbackText;
	}
	public void setFeedbackText(String feedbackText) {
		this.feedbackText = feedbackText;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
    
	
}
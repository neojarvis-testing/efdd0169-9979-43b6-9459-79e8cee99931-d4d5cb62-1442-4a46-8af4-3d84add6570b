package com.examly.springapp.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FeedbackDTO {

	@NotNull(message ="Id should not be empty")
	private Long feedbackId;
	@NotBlank(message="Feedback text is mandatory")
    private String feedbackText;

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
}
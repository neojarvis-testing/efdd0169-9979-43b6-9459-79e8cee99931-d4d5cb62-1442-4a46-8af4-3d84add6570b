package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackDTO {
	private Long feedbackId;
	@NotBlank(message="Feedback text is mandatory")
    private String feedbackText;
	private LocalDate date;
}
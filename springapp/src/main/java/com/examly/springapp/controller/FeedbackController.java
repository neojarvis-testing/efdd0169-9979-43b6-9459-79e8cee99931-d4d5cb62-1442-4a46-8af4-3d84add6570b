
package com.examly.springapp.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.FeedbackDTO;
import com.examly.springapp.service.FeedbackServiceImpl;

import jakarta.validation.Valid;

import java.util.List;

@RestController // Marks class as a RESTful controller
@RequestMapping("/feedback") // Defines base URL mapping for feedback-related endpoints
public class FeedbackController { // Controller to handle feedback operations
    private final FeedbackServiceImpl feedbackService; // Service instance for feedback management

    public FeedbackController(FeedbackServiceImpl feedbackService) { // Constructor to initialize FeedbackService
        this.feedbackService = feedbackService;
    }

    @PostMapping("/{userId}") // Maps request for creating feedback 
    public ResponseEntity<FeedbackDTO> createFeedback( @Valid @RequestBody FeedbackDTO feedbackDTO, @PathVariable Long userId) { // Creates feedback for a user
        Feedback feedback = convertToEntity(feedbackDTO); // Converts DTO to entity
        Feedback createdFeedback = feedbackService.createFeedback(feedback, userId); // Calls service to save feedback
        FeedbackDTO createdFeedbackDTO = convertToDTO(createdFeedback); // Converts saved feedback to DTO
        return ResponseEntity.status(201).body(createdFeedbackDTO); // 201 Created
    }

    @GetMapping("/{id}") // Maps request for retrieving feedback by ID
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) { // Retrieves feedback by ID
        Feedback feedback = feedbackService.getFeedbackById(id); // Calls service to get feedback
        FeedbackDTO feedbackDTO=convertToDTO(feedback); // Calls service to save feedback
        return ResponseEntity.status(200).body(feedbackDTO); // Returns feedback with 200 status

    }

    @GetMapping // Maps request for retrieving all feedbacks
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() { // Retrieves all feedback entries
        List<Feedback> feedbackList = feedbackService.getAllFeedbacks(); // Calls service to get all feedback
        List<FeedbackDTO> feedbackDTOList = feedbackList.stream().map(this::convertToDTO).collect(Collectors.toList()); // Converts list to DTOs
        return ResponseEntity.status(200).body(feedbackDTOList); // Returns created feedback with 201 status
    }

 
    @DeleteMapping("/{id}") // Maps request for deleting feedback by ID
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id){ // Deletes feedback by ID
        boolean isDeleted = feedbackService.deleteFeedback(id); // Calls service to delete feedback
        if (isDeleted) {
            return ResponseEntity.status(200).body("Deleted Succesfully"); // Returns success response
        }
        return ResponseEntity.status(404).body("Cannot Deleted"); // Returns error if deletion fails

    }

    @GetMapping("/user/{userId}") // Maps request for retrieving feedbacks by user ID
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByUserId(@PathVariable Long userId) { // Gets feedbacks for a user
        List<Feedback> feedbackList = feedbackService.getFeedbacksByUserId(userId); // Calls service to get feedbacks
        if (!feedbackList.isEmpty()) {
            List<FeedbackDTO> feedbackDTOList=feedbackList.stream().map(this::convertToDTO).collect(Collectors.toList()); // Converts list to DTOs
            return ResponseEntity.status(200).body(feedbackDTOList); // Returns list with 200 status
        }
        return ResponseEntity.status(404).body(null); // Returns 404 if no feedbacks found
    }

    private FeedbackDTO convertToDTO(Feedback feedback) { // Converts Feedback entity to FeedbackDTO
        FeedbackDTO feedbackDTO = new FeedbackDTO(); // Creates a new DTO instance
        feedbackDTO.setFeedbackId(feedback.getFeedbackId()); // Sets feedback ID
        feedbackDTO.setFeedbackText(feedback.getFeedbackText()); // Sets feedback text
        return feedbackDTO; // Returns the DTO
    }

    private Feedback convertToEntity(FeedbackDTO feedbackDTO) { // Converts FeedbackDTO to Feedback entity
        Feedback feedback = new Feedback(); // Creates a new Feedback instance
        feedback.setFeedbackId(feedbackDTO.getFeedbackId()); // Sets feedback ID
        feedback.setFeedbackText(feedbackDTO.getFeedbackText()); // Sets feedback text
        return feedback; // Returns the entity
    }

}





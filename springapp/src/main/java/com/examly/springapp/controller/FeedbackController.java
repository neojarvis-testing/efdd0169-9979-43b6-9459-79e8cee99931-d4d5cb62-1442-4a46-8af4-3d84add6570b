
package com.examly.springapp.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.FeedbackDTO;
import com.examly.springapp.service.FeedbackServiceImpl;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {
    private final FeedbackServiceImpl feedbackService;

    public FeedbackController(FeedbackServiceImpl feedbackService) {
        this.feedbackService = feedbackService;
    }


    // @PostMapping("/{userId}")
    // public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback
    // feedback, @PathVariable Long userId) {
    // Feedback createdFeedback = feedbackService.createFeedback(feedback, userId);
    // return ResponseEntity.status(201).body(createdFeedback); // 201 Created
    // }

    @PostMapping("/{userId}")
    public ResponseEntity<FeedbackDTO> createFeedback( @Valid @RequestBody FeedbackDTO feedbackDTO, @PathVariable Long userId) {
        Feedback feedback = convertToEntity(feedbackDTO);
        Feedback createdFeedback = feedbackService.createFeedback(feedback, userId);
        FeedbackDTO createdFeedbackDTO = convertToDTO(createdFeedback);
        return ResponseEntity.status(201).body(createdFeedbackDTO); // 201 Created
    }

    // @GetMapping("/{id}")
    // public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
    //     Feedback feedback = feedbackService.getFeedbackById(id);
    //     return ResponseEntity.status(200).body(feedback); // 200 OK

    // }
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        FeedbackDTO feedbackDTO=convertToDTO(feedback);
        return ResponseEntity.status(200).body(feedbackDTO); // 200 OK

    }

    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAllFeedbacks() {
        List<Feedback> feedbackList = feedbackService.getAllFeedbacks();
        List<FeedbackDTO> feedbackDTOList = feedbackList.stream().map(this::convertToDTO).collect(Collectors.toList());
        return ResponseEntity.status(200).body(feedbackDTOList); // 200 OK
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id){
        boolean isDeleted = feedbackService.deleteFeedback(id);
        if (isDeleted) {
            return ResponseEntity.status(200).body("Deleted Succesfully");
        } // 200 OK
        return ResponseEntity.status(404).body("Cannot Deleted");

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbacksByUserId(@PathVariable Long userId) {
        List<Feedback> feedbackList = feedbackService.getFeedbacksByUserId(userId);
        if (!feedbackList.isEmpty()) {
            List<FeedbackDTO> feedbackDTOList=feedbackList.stream().map(this::convertToDTO).collect(Collectors.toList());
            return ResponseEntity.status(200).body(feedbackDTOList); // 200 OK
        }
        return ResponseEntity.status(404).body(null);
    }

    private FeedbackDTO convertToDTO(Feedback feedback) {
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setFeedbackId(feedback.getFeedbackId());
        feedbackDTO.setFeedbackText(feedback.getFeedbackText());
        return feedbackDTO;
    }

    private Feedback convertToEntity(FeedbackDTO feedbackDTO) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(feedbackDTO.getFeedbackId());
        feedback.setFeedbackText(feedbackDTO.getFeedbackText());
        return feedback;
    }

}

package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackServiceImpl feedbackService;

    @PostMapping("/{userId}")
    public ResponseEntity <Feedback> createFeedback(@RequestBody Feedback feedback, @PathVariable Long userId) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback, userId);
        return ResponseEntity.status(201).body(createdFeedback); // 201 Created
    }

    @GetMapping("/{id}")
    public ResponseEntity <Feedback> getFeedbackById(@PathVariable Long id) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        if (feedback != null) 
            return ResponseEntity.status(200).body(feedback); // 200 OK
         
    }

    @GetMapping
    public ResponseEntity <List<Feedback>> getAllFeedbacks() {
        List <Feedback> feedbackList = feedbackService.getAllFeedbacks();
        if (!feedbackList.isEmpty()) 
            return ResponseEntity.status(200).body(feedbackList); // 200 OK
       
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity <Feedback> deleteFeedback(@PathVariable Long id) {
        boolean isDeleted = feedbackService.deleteFeedback(id);
        if (isDeleted) {
            return ResponseEntity.status(200).body(null); // 200 OK
        } 
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity <List<Feedback>> getFeedbacksByUserId(@PathVariable Long userId) {
        List<Feedback> feedbackList = feedbackService.getFeedbacksByUserId(userId);
        if (!feedbackList.isEmpty()) {
            return ResponseEntity.status(200).body(feedbackList); // 200 OK
        }
        return ResponseEntity.status(404).body(null); 
    }
}
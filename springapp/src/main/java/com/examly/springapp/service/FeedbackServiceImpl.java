package com.examly.springapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.FeedbackListEmptyException;
import com.examly.springapp.exceptions.FeedbackNotFoundException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

@Service
public class FeedbackServiceImpl implements FeedbackService{
    private final FeedbackRepo feedbackRepo;
    
    private final UserRepo userRepo;
     public FeedbackServiceImpl(FeedbackRepo feedbackRepo,UserRepo userRepo) {
        this.feedbackRepo=feedbackRepo;
        this.userRepo=userRepo;
     }

    @Override
    public Feedback createFeedback(Feedback feedback, Long userId) {
        User user = userRepo.findById(userId).orElse(null);    // Handle user not found
        if (user == null) {
          throw new UserNotFoundException("User with ID: " + userId + " not found");
        }
        feedback.setUser(user);      
        feedback.setDate(LocalDate.now());   // Set feedback date to the current date
        return feedbackRepo.save(feedback);
    }
  
    @Override
    public Feedback getFeedbackById(Long id) {
        Feedback f= feedbackRepo.findById(id).orElse(null);   // Fetch feedback by ID
        if(f==null){
            throw new FeedbackNotFoundException(("Feedback not found"));
        }
        return feedbackRepo.save(f);   // Save and return the feedback (seems redundant here)
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        List<Feedback> feedbackList = feedbackRepo.findAll();   // Fetch all feedbacks
        if (feedbackList.isEmpty()) {                            // Handle empty feedback list
        throw new FeedbackListEmptyException("No feedback available");
        }
        return feedbackList;
    }

    @Override
    public boolean deleteFeedback(Long id) {
        Feedback feedback = feedbackRepo.findById(id).orElse(null);    // Fetch feedback by ID
        if (feedback == null) {
           throw new FeedbackNotFoundException("Feedback with ID: " + id + " not found");
        }
        feedbackRepo.deleteById(id);   // Delete feedback by ID
        return true;
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        User user=userRepo.findById(userId).orElse(null);   // Fetch user by ID
        if(user==null){
            throw new UserNotFoundException("User with ID: " + userId + " not found");
        }
        return feedbackRepo.findByUser(userId);  // Fetch feedbacks by user ID and return
    }

    

}


package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return null; // User doesn't exist
        }
        feedback.setUser(user);
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepo.findById(id).orElse(null);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public boolean deleteFeedback(Long id) {
        Feedback feedback = feedbackRepo.findById(id).orElse(null);
        if (feedback == null) {
            return false; // Feedback not found
        }
        feedbackRepo.deleteById(id);
        return true;
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        User user=userRepo.findById(userId).orElse(null);
        if(user==null){
            return null;
        }
        return feedbackRepo.findByUser(userId);
    }

}

package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User with ID: " + userId + " not found");
        }
        feedback.setUser(user);
        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        Feedback f= feedbackRepo.findById(id).orElse(null);
        if(f==null){
            throw new FeedbackNotFoundException(("Feedback not found"));
        }
        return feedbackRepo.save(f);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        List<Feedback> feedbackList = feedbackRepo.findAll();
        if (feedbackList.isEmpty()) {
        throw new FeedbackListEmptyException("No feedback available");
        }
        return feedbackList;
    }

    @Override
    public boolean deleteFeedback(Long id) {
        Feedback feedback = feedbackRepo.findById(id).orElse(null);
        if (feedback == null) {
           throw new FeedbackNotFoundException("Feedback with ID: " + id + " not found");
        }
        feedbackRepo.deleteById(id);
        return true;
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        User user=userRepo.findById(userId).orElse(null);
        if(user==null){
            throw new UserNotFoundException("User with ID: " + userId + " not found");
        }
        return feedbackRepo.findByUser(userId);
    }

}


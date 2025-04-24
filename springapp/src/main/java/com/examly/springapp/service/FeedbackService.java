package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
    public Feedback createFeedback(Feedback feedback, Long userId);
    public Feedback getFeedbackById(Long id);
    public List<Feedback> getAllFeedbacks();
    public boolean deleteFeedback(Long id);
    public List<Feedback> getFeedbacksByUserId(Long userId);

}

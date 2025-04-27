package com.examly.springapp.utility;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.FeedbackDTO;

public class Feedbackmapper {

     public static FeedbackDTO mapToFeedbackDTO(Feedback feedback){
        FeedbackDTO feedbackDTO= new FeedbackDTO();
        feedbackDTO.setFeedbackText(feedback.getFeedbackText());
        feedbackDTO.setDate(feedback.getDate());
        return feedbackDTO;
    }  
     
    public static Feedback mapToFeedback(FeedbackDTO feedbackDTO) {
           Feedback feedback=new Feedback();
           feedback.setFeedbackText(feedbackDTO.getFeedbackText());
           feedback.setDate(feedbackDTO.getDate());
           return feedback;
    } 
    

}

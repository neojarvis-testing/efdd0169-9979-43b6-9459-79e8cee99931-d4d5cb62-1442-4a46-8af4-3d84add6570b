import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Feedback } from 'src/app/models/feedback.model';


@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbackList: Feedback[] = []; // List of feedback objects
  userId: number = this.authService.getAuthenticatedUserId(); // Get current user ID
  errorMessage: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks() {
    // Fetch feedback for the authenticated user
    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe(
      data => {
        this.feedbackList = data;
        this.errorMessage = '';
      },
      error => {
        this.errorMessage = 'Failed to load feedback.';
      }
    );
  }

  deleteFeedback(feedbackId: number) {
    // Call service to delete feedback
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      () => {
        this.feedbackList = this.feedbackList.filter(
          feedback => feedback.feedbackId !== feedbackId
        );
      },
      error => {
        this.errorMessage = 'Failed to delete feedback.';
      }
    );
  }
}
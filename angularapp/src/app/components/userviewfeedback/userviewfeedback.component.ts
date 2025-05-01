import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Feedback } from 'src/app/models/feedback.model';
 
@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  userId: number = +sessionStorage.getItem('userId');
  errorMessage: string = '';
 
  toastMessage: string = '';
  confirmationModalVisible: boolean = false;
  confirmationMessage: string = '';
  confirmationCallback: () => void = () => {};
 
  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.loadFeedbacks();
  }
 
  // Load feedbacks by user
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacksByUserId(this.userId).subscribe(
      (data) => {
        this.feedbackList = data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Failed to load feedback.';
        this.showToast(this.errorMessage);
      }
    );
  }
 
  // Show toast with animation
  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }
 
  // Show confirmation modal
  showConfirmation(message: string, onConfirm: () => void): void {
    this.confirmationMessage = message;
    this.confirmationCallback = onConfirm;
    this.confirmationModalVisible = true;
  }
 
  onCancelConfirmation(): void {
    this.confirmationModalVisible = false;
  }
 
  onConfirmAction(): void {
    this.confirmationModalVisible = false;
    this.confirmationCallback();
  }
 
  // Triggered by button click
  confirmDelete(feedbackId: number): void {
    this.showConfirmation('Are you sure you want to delete this feedback?', () => {
      this.deleteFeedback(feedbackId);
    });
  }
 
  // Delete feedback after confirmation
  deleteFeedback(feedbackId: number): void {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      () => {
        this.feedbackList = this.feedbackList.filter(f => f.feedbackId !== feedbackId);
        this.showToast('Feedback deleted successfully.');
      },
      (error) => {
        console.error('Error deleting feedback:', error);
        this.showToast('Failed to delete feedback. Please try again.');
      }
    );
  }
 
  // Triggered by logout button
  confirmLogout(): void {
    this.showConfirmation('Are you sure you want to logout?', () => {
      this.logout();
    });
  }
 
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
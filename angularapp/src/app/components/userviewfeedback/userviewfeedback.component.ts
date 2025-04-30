

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

  feedbackList: Feedback[] = []; // List of feedback objects

  userId: number =+sessionStorage.getItem('userId'); // Dynamically retrieve user ID from route

  errorMessage: string = '';

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

   // this.userId = +this.route.snapshot.paramMap.get('userId')!; // Retrieve userId from route parameters
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
    if (confirm('Are you sure you want to delete this feedback?')) { // Confirm delete
      console.log('Deleting feedback with ID:', feedbackId); // Log the feedback ID
      this.feedbackService.deleteFeedback(feedbackId).subscribe(
        () => {
          console.log('Feedback deleted successfully on the server'); // Log success
          // Ensure feedback list is updated by filtering out the deleted feedback
          this.feedbackList = this.feedbackList.filter(
            feedback => feedback.feedbackId !== feedbackId
          );
          console.log('Updated feedback list:', this.feedbackList); // Log updated list
          alert('Feedback deleted successfully.'); // Notify user of success
        },
        (error) => {
          console.error('Error deleting feedback:', error); // Log error for debugging
          this.errorMessage = 'Failed to delete feedback. Please try again later.';
        }
      );
    }
  }
  




  
  

  logout() {
    if (confirm('Are you sure you want to logout?')) { // Confirm logout
      this.authService.logout(); // Assuming you have a logout method in AuthService
      this.router.navigate(['/login']); // Redirect to login page
    }
  }
}
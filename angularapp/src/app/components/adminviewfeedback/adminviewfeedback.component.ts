import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = []; // Array to store all feedbacks fetched from the API
  showLogoutPopup: boolean = false; // Flag for logout confirmation modal visibility

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService, // Using AuthService to fetch user details
    private router: Router
  ) { }

  ngOnInit(): void {
    // Fetch all feedbacks when the component is initialized
    this.fetchAllFeedbacks();
  }

  // Fetch all feedbacks from the API


  fetchAllFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
        console.log('Feedbacks fetched successfully:', this.feedbacks); // Check the data here
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        this.feedbacks = [];
      }
    );
  }
  // Show user details in an alert box using AuthService
  
  showUserDetails(feedback: Feedback): void {
    if (!feedback.userId) {
      alert('User ID is undefined.');
      return;
    }

    this.authService.getUserById(feedback.userId).subscribe(
      (data) => {
        const userDetails = {
          email: data.email || 'N/A',
          username: data.username || 'N/A',
          mobileNumber: data.mobileNumber || 'N/A',
        };

        alert(
          `Email: ${userDetails.email}\n` +
          `Username: ${userDetails.username}\n` +
          `Phone Number: ${userDetails.mobileNumber}`
        );
      },
      (error) => {
        console.error('Error fetching user details:', error);
        alert('Failed to retrieve user details.');
      }
    );
  }


  // Show logout confirmation modal
  showLogoutConfirmation(): void {
    this.showLogoutPopup = true;
  }

  // Confirm logout and navigate to the login page
  confirmLogout(): void {
    this.showLogoutPopup = false; // Close the logout confirmation modal
    this.authService.logout(); // Clear session and log out user
    this.router.navigate(['/login']); // Navigate to the login component
  }

  // Cancel the logout action
  cancelLogout(): void {
    this.showLogoutPopup = false; // Close the logout confirmation modal
  }
}
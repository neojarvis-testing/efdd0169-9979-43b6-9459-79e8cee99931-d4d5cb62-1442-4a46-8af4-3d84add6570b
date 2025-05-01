import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = []; // Array to store all feedbacks fetched from the API
  showLogoutPopup: boolean = false; // Flag for logout confirmation modal visibility
  showDialog:boolean=false
  user:User
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
    this.showDialog = true;
    //this.user=feedback.user;
    console.log('id:'+ feedback.user.userId)
    if (!feedback.user || !feedback.user.userId) {
      alert('User ID is undefined.');
      return;
    }
    console.log('Fetching details for user ID=' + feedback.user.userId);

    this.authService.getUserById(feedback.user.userId).subscribe(
      (data) => {
        this.user=feedback.user;
        console.log('User data:', data); // Log the user data to check its structure
        if (!data) {
          alert('User data is undefined.');
          return;
        }

        // Access the user details directly from the response object
        const userDetails = {
          email: data[0].user.email || 'N/A',
          username: data[0].user.username || 'N/A',
          mobileNumber: data[0].user.mobileNumber || 'N/A',
        };

        // alert(
        //   `Email: ${userDetails.email}\n` +
        //   `Username: ${userDetails.username}\n` +
        //   `Phone Number: ${userDetails.mobileNumber}`
        // );
      },
      (error) => {
        console.error('Error fetching user details:', error);
        alert('Failed to retrieve user details.');
      }
    );
  }
  onDialogConfirm(): void {
    this.showDialog = false;
    //this.selectedLoan = null;
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

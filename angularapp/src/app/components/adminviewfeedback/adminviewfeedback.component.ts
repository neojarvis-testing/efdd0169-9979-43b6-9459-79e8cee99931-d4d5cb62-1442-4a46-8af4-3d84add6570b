import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit, OnDestroy {
  feedbacks: Feedback[] = [];
  showLogoutPopup: boolean = false;
  showDialog: boolean = false;
  user: User = {
    email: '',
    username: '',
    mobileNumber: '',
    password: '',
    userRole: ''
  };
 
  toastMessage: string = '';
  confirmationModalVisible: boolean = false;
  confirmationMessage: string = '';
  confirmationCallback: () => void = () => {};
 
  private unsubscribe$ = new Subject<void>();
 
  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.fetchAllFeedbacks();
  }
 
  fetchAllFeedbacks(): void {
    this.feedbackService.getFeedbacks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: Feedback[]) => {
          this.feedbacks = data;
          console.log('Feedbacks fetched successfully:', this.feedbacks);
        },
        (error) => {
          console.error('Error fetching feedbacks:', error);
          this.feedbacks = [];
        }
      );
  }
 
  showUserDetails(feedback: Feedback): void {
    this.showDialog = true;
 
    if (!feedback.user || !feedback.user.userId) {
      this.showToast('User ID is undefined.');
      return;
    }
 
    this.authService.getUserById(feedback.user.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data) => {
          if (!data || !data[0] || !data[0].user) {
            this.showToast('User data is undefined.');
            return;
          }
 
          this.user = {
email: data[0].user.email || 'N/A',
            username: data[0].user.username || 'N/A',
            mobileNumber: data[0].user.mobileNumber || 'N/A',
            password: '',
            userRole: ''
          };
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.showToast('Failed to retrieve user details.');
        }
      );
  }
 
  onDialogConfirm(): void {
    this.showDialog = false;
  }
 
  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = ''), 4000);
  }
 
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
 
  showLogoutConfirmation(): void {
    this.showConfirmation('Are you sure you want to logout?', () => {
      this.confirmLogout();
    });
  }
 
  confirmLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 
  cancelLogout(): void {
    this.confirmationModalVisible = false;
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
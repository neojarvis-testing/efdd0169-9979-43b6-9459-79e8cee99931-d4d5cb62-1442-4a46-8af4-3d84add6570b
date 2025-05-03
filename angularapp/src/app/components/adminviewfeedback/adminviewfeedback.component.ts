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
  paginatedFeedbacks: Feedback[] = [];
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
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];

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
          this.totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.paginateFeedbacks();
          console.log('Feedbacks fetched successfully:', this.feedbacks);
        },
        (error) => {
          console.error('Error fetching feedbacks:', error);
          this.feedbacks = [];
        }
      );
  }

  paginateFeedbacks(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFeedbacks = this.feedbacks.slice(start, end);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault(); // Prevent the default anchor tag behavior
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateFeedbacks();
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

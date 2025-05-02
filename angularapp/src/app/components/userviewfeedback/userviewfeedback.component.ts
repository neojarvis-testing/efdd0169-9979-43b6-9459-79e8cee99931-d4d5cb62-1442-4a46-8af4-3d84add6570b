import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Feedback } from 'src/app/models/feedback.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit, OnDestroy {
  feedbackList: Feedback[] = [];
  userId: number = +sessionStorage.getItem('userId');
  errorMessage: string = '';
  toastMessage: string = '';
  confirmationModalVisible: boolean = false;
  confirmationMessage: string = '';
  confirmationCallback: () => void = () => {};
 
  private readonly unsubscribe$ = new Subject<void>();
 
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}
 
  ngOnInit(): void {
    this.loadFeedbacks();
  }
 
  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacksByUserId(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
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
 
  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
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
 
  confirmDelete(feedbackId: number): void {
    this.showConfirmation('Are you sure you want to delete this feedback?', () => {
      this.deleteFeedback(feedbackId);
    });
  }
 
  deleteFeedback(feedbackId: number): void {
    this.feedbackService.deleteFeedback(feedbackId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
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
 
  confirmLogout(): void {
    this.showConfirmation('Are you sure you want to logout?', () => {
      this.logout();
    });
  }
 
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
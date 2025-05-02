import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit, OnDestroy {
  feedbackForm: FormGroup;
  userId: number = +sessionStorage.getItem('userId');
  toastMessage: string = '';
  private unsubscribe$ = new Subject<void>();
 
  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
 
  ngOnInit(): void {}
 
  onSubmit(): void {
    if (this.feedbackForm.invalid) return;
 
    const feedback: Feedback = {
      feedbackId: undefined,
      userId: this.userId,
      feedbackText: this.feedbackForm.value.feedbackText,
      date: new Date()
    };
 
    this.feedbackService.sendFeedback(feedback, this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.feedbackForm.reset();
          this.showToast('Feedback successfully submitted!');
          setTimeout(() => this.router.navigate(['/userviewfeedback', this.userId]), 1000);
        },
        error => {
          console.error('Error adding feedback:', error);
          this.showToast('Error submitting feedback. Try again.');
        }
      );
  }
 
  showToast(message: string): void {
    this.toastMessage = message;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.toastMessage = '';
      this.cdRef.detectChanges();
    }, 4000);
  }
 
  get f() {
    return this.feedbackForm.controls;
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
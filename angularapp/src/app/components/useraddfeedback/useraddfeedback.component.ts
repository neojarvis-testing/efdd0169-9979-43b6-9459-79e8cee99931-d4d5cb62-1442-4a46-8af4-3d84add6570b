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
  wordCount: number = 0;
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

  ngOnInit(): void {
    this.feedbackForm.get('feedbackText').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.updateWordCount();
      });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid || this.wordCount > 500) return;

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
          setTimeout(() => this.router.navigate(['/userviewfeedback', this.userId]), 500);
        },
        error => {
          console.error('Error adding feedback:', error);
          this.showToast('Error submitting feedback. Try again.');
        }
      );
  }

  updateWordCount(): void {
    const text = this.feedbackForm.get('feedbackText').value || '';
    this.wordCount = text.trim().split(/\s+/).length;
    if (this.wordCount > 500) {
      const truncatedText = text.trim().split(/\s+/).slice(0, 500).join(' ');
      this.feedbackForm.get('feedbackText').setValue(truncatedText, { emitEvent: false });
      this.wordCount = 500;
    }
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

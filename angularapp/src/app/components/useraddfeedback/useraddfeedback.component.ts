import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  showPopup: boolean = false;
  userId!: number; // Ensure userId is initialized dynamically

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedbackForm = this.fb.group({
      feedbackText: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    // Dynamically retrieve userId from route parameters
    this.route.params.subscribe(params => {
      this.userId = +params['userId']; // Convert to number
      console.log('Retrieved userId:', this.userId); // Debug log
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      return; // Prevent submission if form is invalid
    }

    // Create feedback object with userId and form data
    const feedback: Feedback = {
      feedbackId: undefined, // Backend generates feedback ID
      userId: this.userId, // Use the dynamic userId from route
      feedbackText: this.feedbackForm.value.feedbackText,
      date: new Date() // Set the current date
    };

    this.feedbackService.sendFeedback(feedback, this.userId).subscribe(
      response => {
        this.feedbackForm.reset(); // Clear the form
        alert("Successfully Added!")// Show success popup
      },
      error => {
        console.error('Error adding feedback:', error); // Log error for debugging
        alert('Error adding feedback');
      }
    );
  }

  closePopup(): void {
    this.showPopup = false;
    this.router.navigateByUrl('/useraddfeedback'); // Reload the component
  }
}
// import { Component, OnInit } from '@angular/core';
// import { FeedbackService } from 'src/app/services/feedback.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Feedback } from 'src/app/models/feedback.model';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-useraddfeedback',
//   templateUrl: './useraddfeedback.component.html',
//   styleUrls: ['./useraddfeedback.component.css']
// })
// export class UseraddfeedbackComponent implements OnInit {
//   feedbackForm: FormGroup;
//   showPopup: boolean = false;

//   userId:number=+sessionStorage.getItem('userId'); // Ensure userId is initialized dynamically


//   constructor(
//     private fb: FormBuilder,
//     private feedbackService: FeedbackService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     this.feedbackForm = this.fb.group({
//       feedbackText: ['', [Validators.required, Validators.minLength(3)]]
//     });
//   }

//   ngOnInit(): void {

//     //Dynamically retrieve userId from route parameters
//     // this.route.params.subscribe(params => {
//     //   this.userId = +params['userId']; // Convert to number
//     //   console.log('Retrieved userId:', this.userId); // Debug log
//     // });

//   }

//   onSubmit(): void {
//     if (this.feedbackForm.invalid) {
//       return; // Prevent submission if form is invalid
//     }

//     // Create feedback object with userId and form data
//     const feedback: Feedback = {
//       feedbackId: undefined, // Backend generates feedback ID
//       userId: this.userId, // Use the dynamic userId from route
//       feedbackText: this.feedbackForm.value.feedbackText,
//       date: new Date() // Set the current date
//     };

//     this.feedbackService.sendFeedback(feedback, this.userId).subscribe(
//       response => {
//         this.feedbackForm.reset(); // Clear the form
//         alert("Successfully Added!")// Show success popup

//         this.router.navigate(['/userviewfeedback',this.userId])

//       },
//       error => {
//         console.error('Error adding feedback:', error); // Log error for debugging
//         alert('Error adding feedback');
//       }
//     );
//   }

//   closePopup(): void {
//     this.showPopup = false;
//   this.router.navigate(['/userviewfeedback',this.userId]); // Reload the component
//   }
// }






import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
 
@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  feedbackForm: FormGroup;
  userId: number = +sessionStorage.getItem('userId');
  toastMessage: string = '';
 
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
 
    this.feedbackService.sendFeedback(feedback, this.userId).subscribe(
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
}
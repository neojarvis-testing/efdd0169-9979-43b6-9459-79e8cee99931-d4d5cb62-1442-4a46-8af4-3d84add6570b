import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  signupForm: FormGroup;
  showToastNotification: boolean = false;
  showErrorModal: boolean = false;
  errorMessage: string = '';
  private readonly unsubscribe$ = new Subject<void>();
 
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6-9][0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{6,}')]],
      confirmPassword: ['', Validators.required],
      userRole: ['USER', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmPassword') });
  }
 
 
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      return password.value !== confirmPassword.value
        ? confirmPassword.setErrors({ notEquivalent: true })
        : confirmPassword.setErrors(null);
    };
  }
 
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            console.log('Signup successful', response);
            this.showToastNotification = true;
            setTimeout(() => {
              this.showToastNotification = false;
              this.router.navigate(['/login']);
            }, 3000);
          },
          error => {
            console.error('Signup failed', error);
            this.handleError(error);
          }
        );
    }
  }
 
  handleError(error: any): void {
    if (error?.status) {
      if (error.status === 401) {
        this.errorMessage = 'User with this email already exists!!';
        this.router.navigate(['/register']);
      } else if (error.status === 400) {
        this.errorMessage = error.error?.message === 'User with this email already exists!!'
          ? 'User with this email already exists!'
          : 'Bad Request. Please check your input.';
      } else if (error.status === 500) {
        this.errorMessage = 'Internal Server Error. Please try again later.';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    }
    this.showErrorModal = true;
  }
 
  closeErrorModal(): void {
    this.showErrorModal = false;
    this.router.navigate(['/register']).then(() => {
      window.location.reload();
    });
  }
 
  login(): void {
    this.router.navigate(['/login']);
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
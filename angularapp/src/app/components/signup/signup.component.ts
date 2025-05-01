import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  ngOnInit(): void {
    
  }


  signupForm: FormGroup;
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
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
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ notEquivalent: true });
      } else {
        return confirmPassword.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        response => {
          console.log('Signup successful', response);
          this.showSuccessModal = true;
        },
        error => {
          console.error('Signup failed', error);
          this.handleError(error);
        }
      );
    }
  }

  handleError(error: any) {
    if (error && error.status) {
      if (error.status === 401) {
        this.errorMessage = 'User with this email already exists!!';
        this.router.navigate(['/register']);
      } else if (error.status === 400) {
        if (error.error && error.error.message === 'User with this email already exists!!') {
          this.errorMessage = 'User with this email already exists!';
        } else {
          this.errorMessage = 'Bad Request. Please check your input.';
        }
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

  closeErrorModal() {
    this.showErrorModal = false;
    this.router.navigate(['/register']).then(() => {
        window.location.reload();
    });
}

  login() {
    this.router.navigate(['/login']);
  }

  closeModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/login']);
  }




}

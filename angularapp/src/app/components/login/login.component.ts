import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }
  loginData = {
    email: '',
    password: ''
  };
  loginFailed: boolean = false;
  passwordVisible: boolean = false; // Added this property

  constructor(private authService: AuthService, private router: Router,private ngxService:NgxUiLoaderService) {}

  onSubmit() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe(
      response => {
        console.log('Login successful', response);
        this.loginFailed = false;
        // Handle success, store token, navigate to another page, etc.
        if (response.userRole == 'USER') {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login failed', error);
        this.loginFailed = true;
      }
    );
  }

  signUp() {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
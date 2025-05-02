import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
 
  loginData = {
    email: '',
    password: ''
  };
  loginFailed: boolean = false;
  passwordVisible: boolean = false;
  private unsubscribe$ = new Subject<void>();
 
  constructor(private authService: AuthService, private router: Router) {}
 
  ngOnInit(): void {}
 
  onSubmit(): void {
this.authService.login(this.loginData.email, this.loginData.password)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          console.log('Login successful', response);
          this.loginFailed = false;
          if (response.userRole === 'USER') {
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
 
  signUp(): void {
    this.router.navigate(['/register']);
  }
 
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
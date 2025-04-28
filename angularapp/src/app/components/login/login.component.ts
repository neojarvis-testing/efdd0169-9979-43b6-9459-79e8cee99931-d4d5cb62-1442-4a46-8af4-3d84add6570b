import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:Login={email:"", password:""}
  errorMsg: string = ''
  constructor(private service: AuthService, private router: Router) { }
 
  ngOnInit(): void {
 
  }
 
  loginUser() {
    console.log(this.login)
    console.log(this.service.baseUrl)
    this.service.login(this.login).subscribe((data) => {
      this.login = data
      alert('LOgin Success')
    },
 
      (error) => {
        console.log(error)
        this.errorMsg = 'Incorrect email or password. Please try again.'
      });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public readonly authService:AuthService,private readonly router:Router) { }
 

 
  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}

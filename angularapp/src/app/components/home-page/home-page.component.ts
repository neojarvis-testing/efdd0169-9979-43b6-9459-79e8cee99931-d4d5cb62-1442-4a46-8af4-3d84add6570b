import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.addScrollAnimations();
  }

  // Add scroll animations when sections come into view
  addScrollAnimations(): void {
    const sections = document.querySelectorAll('.features-section, .stats-section, .testimonials-section');
    window.addEventListener('scroll', () => {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add('visible');
        }
      });
    });
  }

  applyBtn(){
    this.router.navigate(['/login'])
  }
}

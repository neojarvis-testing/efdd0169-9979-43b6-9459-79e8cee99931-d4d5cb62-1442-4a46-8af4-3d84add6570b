import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  errorMessage: string | null = null;

  showError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }


}

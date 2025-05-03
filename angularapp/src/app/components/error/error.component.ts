import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor() { }

  errorMessage: string | null = null;

  showError(message: string) {
    this.errorMessage = message;
  }

  clearError() {
    this.errorMessage = null;
  }


}

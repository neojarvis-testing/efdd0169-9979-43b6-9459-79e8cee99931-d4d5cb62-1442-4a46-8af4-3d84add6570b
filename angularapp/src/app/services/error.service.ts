import { Injectable } from '@angular/core';
import { ErrorComponent } from '../components/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

private errorComponent: ErrorComponent | null = null;
private errorMsg:string | null=null;

  registerErrorComponent(component: ErrorComponent) {
    this.errorComponent = component;
  }

  showError(message: string) {
  this.errorMsg=message
    if (this.errorComponent) {
      this.errorComponent.showError(message);
    }
  }

  clearError() {
  this.errorMsg=null;
    if (this.errorComponent) {
      this.errorComponent.clearError();
    }
  }

hasError():boolean{
  return this.errorMsg!==null
}

}

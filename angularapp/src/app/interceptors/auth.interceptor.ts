import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private errorService:ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {

    let token = this.authService.getAuthenticatedToken();
    let email = this.authService.getAuthenticatedEmail();
    if (token && email) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }


    this.errorService.clearError();

    console.log(JSON.stringify(request));
    return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
    console.error('HTTP Error:', error);
          this.errorService.showError(error.message);
          return throwError(error);
        })
    );
  }


}

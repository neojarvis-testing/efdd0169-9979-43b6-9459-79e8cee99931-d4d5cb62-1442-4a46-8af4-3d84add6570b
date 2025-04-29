import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

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
    console.log(JSON.stringify(request));
    return next.handle(request);
  }


}

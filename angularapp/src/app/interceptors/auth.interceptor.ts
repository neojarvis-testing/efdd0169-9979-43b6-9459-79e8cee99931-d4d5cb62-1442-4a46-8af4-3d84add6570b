import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor 
{

  constructor(private authService: AuthService,private errorService:ErrorService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    if(request.url.includes("/login") || request.url.includes("/register")){
      return next.handle(request);
    }

    let token = this.authService.getAuthenticatedToken();
    console.log(token)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    
    return next.handle(request);
    }
    return next.handle(request)
  }
}




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { ApiUrl } from '../constants/api_url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  baseUrl:string=''

  constructor(private http:HttpClient) { 
    this.baseUrl=ApiUrl.apiUrl
  }

  register(user:User):Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/register`,user);
  }

  login(login:Login):Observable<Login>{
    return this.http.post<Login>(`${this.baseUrl}/login`,login);
  }
  isLoggedIn(): boolean 
  {
       return !!localStorage.getItem('token');
       }
     
       isAdmin(): boolean {
          return localStorage.getItem('userRole') === 'ADMIN';
       }
     
       isUser(): boolean {
          return localStorage.getItem('userRole') === 'USER';
       }
     
       logout(): void {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
    }
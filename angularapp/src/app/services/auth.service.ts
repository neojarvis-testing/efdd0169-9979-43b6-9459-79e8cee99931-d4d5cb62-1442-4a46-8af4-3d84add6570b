import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ApiUrl } from '../constants/apiUrl';

export class AuthenticationBean {
  constructor(
    public userId: number,
    public token: string,
    public userRole: string,
    public username: string
  ) { }
}

export const AUTHENTICATED_EMAIL = 'authenticatedEmail';
export const TOKEN = 'token';
export const USER_ID = 'userId';
export const USERNAME = 'username';
export const USER_ROLE = 'userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = ''
  username: string = '';
  userRole: string = '';

  constructor(private readonly http: HttpClient) {
    this.baseUrl = ApiUrl.apiUrl;
  }

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthenticationBean>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(data => {
        sessionStorage.setItem(USER_ID, "" + data.userId);
        sessionStorage.setItem(AUTHENTICATED_EMAIL,email);
        sessionStorage.setItem(USERNAME, data.username);
        sessionStorage.setItem(USER_ROLE, data.userRole);
        sessionStorage.setItem(TOKEN, data.token);
        this.username = data.username;
        this.userRole = data.userRole;
        return data;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/feedback/user/${userId}`);
  }

  getAuthenticatedUserId(): number {
    return parseInt(sessionStorage.getItem(USER_ID));
  }

  getAuthenticatedEmail(): string {
    return sessionStorage.getItem(AUTHENTICATED_EMAIL);
  }

  getAuthenticatedToken(): string {
    if (this.getAuthenticatedEmail()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  existsByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/exists-by-email/${email}`);
  }

  updatePassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/updatePassword/${email}`, newPassword);
  }

  isUserLoggedIn(): boolean {
    let user = sessionStorage.getItem(AUTHENTICATED_EMAIL);
    return user != null;
  }

  logout(): void {
    sessionStorage.clear()
  }

  getUserName(): string {
    return sessionStorage.getItem(USERNAME);
  }

  getUserRole(): string {
    return sessionStorage.getItem(USER_ROLE);
  }


  isUser(): boolean {
    return this.getUserRole() === 'USER';
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

}


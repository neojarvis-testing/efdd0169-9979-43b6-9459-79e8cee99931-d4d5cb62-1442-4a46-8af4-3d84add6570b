// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Login } from '../models/login.model';
// import { User } from '../models/user.model';
// import { ApiUrl } from '../constants/apiUrl';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   baseUrl:string=''
 
//   constructor(private http:HttpClient) {
//     this.baseUrl=ApiUrl.apiUrl
//     console.log('url:'+this.baseUrl)
//   }
 
//   register(user:User):Observable<User>{
//     console.log('url:'+this.baseUrl)
//     return this.http.post<User>(`${this.baseUrl}/register`,user);
//   }
 
//   // login(login:Login):Observable<Login>{
//   //   return this.http.post<Login>(`${this.baseUrl}/login`,login);
//   // }

  
//   login(email: string, password: string): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
//   }
  
//   isLoggedIn(): boolean
//   {
//        return !!localStorage.getItem('token');
//        }
     
//        isAdmin(): boolean {
//           return localStorage.getItem('userRole') === 'ADMIN';
//        }
     
//        isUser(): boolean {
//           return localStorage.getItem('userRole') === 'USER';
//        }
     
//        logout(): void {
//           localStorage.removeItem('token');
//           localStorage.removeItem('role');
//         }
// }










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
  ) {}
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
  baseUrl: string = ApiUrl.apiUrl;
  username: string = '';
  userRole: string = '';

  constructor(private http: HttpClient) {}

  // Login
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthenticationBean>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(data => {
        sessionStorage.setItem(USER_ID, "" + data.userId);
        sessionStorage.setItem(AUTHENTICATED_EMAIL, email);
        sessionStorage.setItem(USERNAME, data.username);
        sessionStorage.setItem(USER_ROLE, data.userRole);
        sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
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
    return this.http.get(`${this.baseUrl}/user/${userId}`);
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
    return !(user == null);
  }

  logout(): void {
    sessionStorage.removeItem(AUTHENTICATED_EMAIL);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(USER_ID);
    sessionStorage.removeItem(USERNAME);
    sessionStorage.removeItem(USER_ROLE);
  }

  getUserName(): string {
    return sessionStorage.getItem(USERNAME);
  }

  getUserRole(): string {
    return sessionStorage.getItem(USER_ROLE);
  }
}

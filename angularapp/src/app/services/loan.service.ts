import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrl } from '../constants/apiUrl';
 
@Injectable({
  providedIn: 'root'
})
export class LoanService {
 
  baseUrl:string=''
 
 
  constructor(private http:HttpClient) {
    this.baseUrl=ApiUrl.apiUrl
    console.log('url:'+this.baseUrl)
  }
 
  getAllLoans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/loan`);
  }
 
  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/loan/${loanId}`);
  }
 
  getLoanById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/loan/${id}`);
  }
 
  addLoan(requestObject: Loan): Observable<any> {
    return this.http.post(`${this.baseUrl}/loan`, requestObject);
  }
 
  updateLoan(id: number, requestObject: Loan): Observable<any> {
    return this.http.put(`${this.baseUrl}/loan/${id}`, requestObject);
  }
 
  getAppliedLoans(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/loanapplication/user/${userId}`);
  }
 
  deleteLoanApplication(loanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/loanapplication/${loanId}`);
  }
 
  addLoanApplication(loanApplication: LoanApplication): Observable<any> {
    return this.http.post(`${this.baseUrl}/loanapplication`, loanApplication);
  }
 
  getAllLoanApplications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/loanapplication`);
  }
 
  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<any> {
    return this.http.put(`${this.baseUrl}/loanapplication/${id}`, loanApplication);
  }
 
  // New methods to fetch loan status and monthly loan data
  getLoanStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/loan/status`);
  }
 
  getMonthlyLoanData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/loan/monthly`);
  }
 
}
 
import { Injectable } from '@angular/core';
import { ApiUrl } from '../constants/apiUrl';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get(`${this.baseUrl}/api/loan`);
  }

  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/loan/${loanId}`);
  }

  getLoanById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/loan/${id}`);
  }

  addLoan(requestObject: Loan): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/loan`, requestObject);
  }

  updateLoan(id: number, requestObject: Loan): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/loan/${id}`, requestObject);
  }

  getAppliedLoans(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/loanapplication/user/${userId}`);
  }

  deleteLoanApplication(loanId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/loanapplication/${loanId}`);
  }

  addLoanApplication(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/loanapplication`, formData);
  }

  getAllLoanApplications(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/loanapplication`);
  }

  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/loanapplication/${id}`, loanApplication);
  }

  // New methods to fetch loan status and monthly loan data
  getLoanStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/loan/status`);
  }

  getMonthlyLoanData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/loan/monthly`);
  }

}

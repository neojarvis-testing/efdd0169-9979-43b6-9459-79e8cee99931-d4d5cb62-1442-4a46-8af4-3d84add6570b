import { Injectable } from '@angular/core';
import { ApiUrl } from '../constants/api_url';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private apiUrl: string;


  constructor(private http: HttpClient, private apiUrlService: ApiUrl) {
    this.apiUrl = apiUrlService.apiUrl;
  }

  getAllLoans(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/loan`);
  }

  deleteLoan(loanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/loan/${loanId}`);
  }

  getLoanById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/loan/${id}`);
  }

  addLoan(requestObject: Loan): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/loan`, requestObject);
  }

  updateLoan(id: number, requestObject: Loan): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/loan/${id}`, requestObject);
  }

  getAppliedLoans(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/loanapplication/user/${userId}`);
  }

  deleteLoanApplication(loanId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/loanapplication/${loanId}`);
  }

  addLoanApplication(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/loanapplication`, formData);
  }

  getAllLoanApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/loanapplication`);
  }

  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/loanapplication/${id}`, loanApplication);
  }

  // New methods to fetch loan status and monthly loan data
  getLoanStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/loan/status`);
  }

  getMonthlyLoanData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/loan/monthly`);
  }

}

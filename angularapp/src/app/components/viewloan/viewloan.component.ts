import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loan } from 'src/app/models/loan.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoanService } from 'src/app/services/loan.service';
import { ChangeDetectorRef } from '@angular/core';
 
@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit, OnDestroy {
 
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;
  toastMessage: string = '';
  showDeleteModal: boolean = false;
  loanIdToDelete: number | null = null;
  private subscription: Subscription = new Subscription();
 
  constructor(
    private loanService: LoanService,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.getAllLoans();
    this.checkUserRole();
  }
 
  getAllLoans(): void {
    this.subscription.add(
      this.loanService.getAllLoans().pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load loans. Please try again later.';
          this.showToast(this.errorMessage);
          return of([]);
        })
      ).subscribe((data: Loan[]) => {
this.loans = data;
        this.filteredLoans = data;
      })
    );
  }
 
  filterLoans(): void {
this.filteredLoans = this.loans.filter(loan =>
      loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
 
  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'ADMIN';
  }
 
  confirmDelete(loanId: number): void {
    this.loanIdToDelete = loanId;
    this.showDeleteModal = true;
  }
 
  deleteLoanConfirmed(): void {
    if (this.loanIdToDelete !== null) {
      this.subscription.add(
        this.loanService.deleteLoan(this.loanIdToDelete).subscribe(() => {
          this.showToast('Loan deleted successfully.');
          this.getAllLoans();
          this.cancelDelete();
        }, error => {
          this.errorMessage = 'Failed to delete loan. Please try again later.';
          this.showToast(this.errorMessage);
        })
      );
    }
  }
 
  cancelDelete(): void {
    this.showDeleteModal = false;
    this.loanIdToDelete = null;
  }
 
  showToast(message: string): void {
    this.toastMessage = message;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.toastMessage = '';
      this.cdRef.detectChanges();
    }, 4000);
  }
 
  applyLoan(loanId: number): void {
    this.router.navigate(['/loanform', loanId]);
  }
 
  editLoan(loanId: number): void {
    this.router.navigate(['/addloan', loanId]);
  }
 
  resetSearch(): void {
    this.searchTerm = '';
    this.filterLoans();
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
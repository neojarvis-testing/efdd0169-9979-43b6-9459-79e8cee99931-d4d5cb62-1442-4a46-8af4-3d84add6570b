import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit, OnDestroy {
  loans: LoanApplication[] = [];
  search: string = '';
  filteredLoans: LoanApplication[] = [];
  selectedLoan: LoanApplication;
  loanToReject: LoanApplication;
  noDataFound: boolean = false;
  showRejectionModal: boolean = false;
  showDialog = false;
  private unsubscribe$ = new Subject<void>();
 
  constructor(
    private loanService: LoanService,
    private fb: FormBuilder
  ) {}
 
  ngOnInit(): void {
    this.loadLoans();
  }
 
  loadLoans(): void {
    this.loanService.getAllLoanApplications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: LoanApplication[]) => {
          this.loans = data.reverse();
          this.filteredLoans = [...this.loans];
          this.noDataFound = this.loans.length === 0;
        },
        error => {
          console.error('Error fetching loan applications', error);
          this.noDataFound = true;
        }
      );
  }
 
  approveLoan(loan: LoanApplication): void {
    loan.loanStatus = 'Approved';
    this.loanService.updateLoanStatus(loan.loanApplicationId, loan)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => this.loadLoans(),
        error => console.error('Error updating loan status', error)
      );
  }
 
  rejectLoan(loan: LoanApplication): void {
    this.loanToReject = loan;
    this.showRejectionModal = true;
  }
 
  confirmRejectLoan(): void {
    if (this.loanToReject) {
      this.loanToReject.loanStatus = 'Rejected';
      this.loanService.updateLoanStatus(this.loanToReject.loanApplicationId, this.loanToReject)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loadLoans();
            this.closeRejectionModal();
          },
          error => console.error('Error updating loan status', error)
        );
    }
  }
 
  closeRejectionModal(): void {
    this.loanToReject = null;
    this.showRejectionModal = false;
  }
 
  showMore(loan: LoanApplication): void {
    this.selectedLoan = loan;
    this.showDialog = true;
  }
 
  onDialogConfirm(): void {
    this.showDialog = false;
    this.selectedLoan = null;
  }
 
  onSearch(event: any): void {
    this.search = event.target.value.toLowerCase();
    this.filteredLoans = this.search
      ? this.loans.filter(loan =>
          loan.loan.loanType.toLowerCase().includes(this.search))
      : [...this.loans];
  }
 
  filterByStatus(status: string): void {
    if (status === 'all') {
      this.filteredLoans = [...this.loans];
    } else {
      this.filteredLoans = this.loans.filter(
        loan => loan.loanStatus.toLowerCase() === status.toLowerCase()
      );
    }
    this.noDataFound = this.filteredLoans.length === 0;
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
 
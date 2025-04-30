// requestedloan.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit {
  loans: LoanApplication[] = [];
  search: string = '';
  filteredLoans: LoanApplication[] = [];
  selectedLoan: LoanApplication;
  loanToReject: LoanApplication;
  noDataFound: boolean = false;
  showRejectionModal: boolean = false;
  showDialog=false
  constructor(private loanService: LoanService, private fb: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAllLoanApplications().subscribe(
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
   // this.selectedLoan=loan;
    this.loanService.updateLoanStatus(loan.loanApplicationId, loan).subscribe(
      () => this.loadLoans(),
      error => console.error('Error updating loan status', error)
    );
  }
  
  rejectLoan(loan: LoanApplication): void {
    loan.loanStatus = 'Rejected';
   // this.selectedLoan=loan;
    this.loanService.updateLoanStatus(loan.loanApplicationId, loan).subscribe(
      () => this.loadLoans(),
      error => console.error('Error updating loan status', error)
    );
    this.loanToReject = loan;
    this.showRejectionModal = true;
  }

  confirmRejectLoan(): void {
    if (this.loanToReject) {
      this.loanToReject.loanStatus = 'Rejected';
      this.loanService.updateLoanStatus(this.loanToReject.loanApplicationId, this.loanToReject).subscribe(
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
    this.showDialog=true;
  }

  onDialogConfirm(): void {
    this.showDialog = false;
    this.selectedLoan = null;
  }

  // closeModal(): void {
  //   this.selectedLoan = null;
  // }

  onSearch(event: any): void {
    this.search = event.target.value.toLowerCase();
    this.filteredLoans = this.search ? this.loans.filter(loan => loan.loan.loanType.toLowerCase().includes(this.search)) : [...this.loans];
  }

  filterByStatus(status: string): void {
    if (status === 'all') {
      this.filteredLoans = [...this.loans];
    } 
    else{
      this.filteredLoans = this.loans.filter(loan => loan.loanStatus.toLowerCase() === status.toLowerCase());
    }
    this.noDataFound = this.filteredLoans.length === 0;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-requestedloan',
  templateUrl: './requestedloan.component.html',
  styleUrls: ['./requestedloan.component.css']
})
export class RequestedloanComponent implements OnInit, OnDestroy {
  loans: LoanApplication[] = [];
  filteredLoans: LoanApplication[] = [];
  paginatedLoans: LoanApplication[] = [];
  selectedLoan: LoanApplication;
  loanToReject: LoanApplication;
  noDataFound: boolean = false;
  showRejectionModal: boolean = false;
  showDialog = false;
  search: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;

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
          this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.paginateLoans();
          this.noDataFound = this.loans.length === 0;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching loan applications', error);
          this.noDataFound = true;
          this.isLoading = false;
        }
      );
  }

  paginateLoans(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedLoans = this.filteredLoans.slice(start, end);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault(); // Prevent the default anchor tag behavior
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateLoans();
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
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
    this.paginateLoans();
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
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
    this.paginateLoans();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

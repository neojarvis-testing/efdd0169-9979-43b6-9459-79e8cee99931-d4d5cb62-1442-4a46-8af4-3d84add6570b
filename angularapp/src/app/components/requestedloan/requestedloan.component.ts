import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  rejectionForm: FormGroup;
 
  private unsubscribe$ = new Subject<void>();
 
  constructor(
    private loanService: LoanService,
    private fb: FormBuilder
  ) {}
 
  ngOnInit(): void {
    this.initRejectionForm();
    this.loadLoans();
  }
 
  initRejectionForm(): void {
this.rejectionForm = this.fb.group({
      rejectionReason: ['', Validators.required]
    });
  }
 
  loadLoans(): void {
    this.loanService.getAllLoanApplications()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: LoanApplication[]) => {
this.loans = data.reverse();
this.filteredLoans = [...this.loans];
          this.updatePagination();
          this.noDataFound = this.filteredLoans.length === 0;
          this.isLoading = false;
        },
        error => {
          console.error('Error fetching loan applications', error);
          this.noDataFound = true;
          this.isLoading = false;
          this.filteredLoans = [];
          this.updatePagination();
        }
      );
  }
 
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage) || 1;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginateLoans();
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
    this.rejectionForm.reset();
    this.showRejectionModal = true;
  }
 
  confirmRejectLoan(): void {
    if (this.loanToReject && this.rejectionForm.valid) {
      this.loanToReject.loanStatus = 'Rejected';
      // You can add code here to store the rejection reason if your API supports it
      // this.loanToReject.rejectionReason = this.rejectionForm.get('rejectionReason').value;
      
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
    
    this.noDataFound = this.filteredLoans.length === 0;
    this.currentPage = 1;
    this.updatePagination();
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
    this.currentPage = 1;
    this.updatePagination();
  }

  resetSearch(): void {
    this.search = '';
    this.loadLoans();
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loan } from 'src/app/models/loan.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})

export class ViewloanComponent implements OnInit, OnDestroy {

  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  paginatedLoans: Loan[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private loanService: LoanService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getAllLoans();
    this.checkUserRole();
  }

  getAllLoans(): void {
    this.subscription.add(
      this.loanService.getAllLoans().pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load loans. Please try again later.';
          console.error('Error fetching loans:', error);
          return of([]);
        })
      ).subscribe((data: Loan[]) => {
        this.loans = data;
        this.filteredLoans = data;
        this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.paginateLoans();
      })
    );
  }

  filterLoans(): void {
    this.filteredLoans = this.loans.filter(loan =>
      loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.currentPage = 1;
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

  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'ADMIN';
  }

  deleteLoan(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete?');
    if (confirmed) {
      this.subscription.add(
        this.loanService.deleteLoan(id).subscribe(() => {
          this.getAllLoans();
        }, error => {
          this.errorMessage = 'Failed to delete loan. Please try again later.';
          console.error('Error deleting loan:', error);
        })
      );
    }
  }

  applyLoan(loanId: number): void {
    console.log(`Applying for loan with ID: ${loanId}`);
    this.router.navigate(['/loanform', loanId]);
  }

  editLoan(loanId: number): void {
    this.router.navigate(['/addloan', loanId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filterLoans();
  }
}

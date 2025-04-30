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
  searchTerm: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;
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
    // Implement the logic for applying for a loan
    console.log(`Applying for loan with ID: ${loanId}`);
    // You can navigate to an application form or perform other actions here
    this.router.navigate(['/loanform', loanId]);
  }



  editLoan(loanId: number): void {
    this.router.navigate(['/addloan', loanId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}


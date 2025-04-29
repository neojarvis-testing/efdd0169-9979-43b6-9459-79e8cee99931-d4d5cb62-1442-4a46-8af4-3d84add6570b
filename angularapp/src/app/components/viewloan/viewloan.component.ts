import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Loan } from 'src/app/models/loan.model';
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
  private subscription: Subscription = new Subscription();

  constructor(private loanService: LoanService, private router: Router) { }

  ngOnInit(): void {
    this.getAllLoans();
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

  // getAllLoans(): void {
  //   this.loanService.getAllLoans().subscribe((data: Loan[]) => {
  //     this.loans = data;
  //   });
  // }


  filterLoans(): void {
    this.filteredLoans = this.loans.filter(loan =>
      loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteLoan(id: number): void {
    console.log("1")
    this.subscription.add(
      this.loanService.deleteLoan(id).subscribe(() => {
        console.log("2")
        this.getAllLoans();
        console.log("3")
      }, error => {
        this.errorMessage = 'Failed to delete loan. Please try again later.';
        console.error('Error deleting loan:', error);
      })
    );
  }

  // deleteLoan(id: number): void {
  //   this.loanService.deleteLoan(id).subscribe(() => {
  //     this.getAllLoans();
  //   });
  // }

  editLoan(loanId: number): void {
    this.router.navigate(['/addloan', loanId]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}


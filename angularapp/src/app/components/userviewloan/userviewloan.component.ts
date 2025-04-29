import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  appliedLoans: Set<number> = new Set();
  loanTypes: string[] = [];
  
  form = new FormGroup({
    search: new FormControl(''),
    loanType: new FormControl('all')
  });

  constructor(private service: LoanService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllLoans();

    this.route.queryParams.subscribe(params => {
      const loanId = params['loanId'];
      const success = params['success'];
      if (success && loanId) {
        this.appliedLoans.add(Number(loanId));
      }
    });

    // Reactively filter loans based on form changes
    this.form.valueChanges.subscribe(({ search, loanType }) => {
      this.filterLoans(search, loanType);
    });
  }

  getAllLoans() {
    this.service.getAllLoans().subscribe(data => {
      this.loans = data.reverse();
      this.filteredLoans = [...this.loans];
      this.extractLoanTypes();
    });
  }

  extractLoanTypes() {
    const loanTypeSet = new Set(this.loans.map(loan => loan.loanType));
    this.loanTypes = Array.from(loanTypeSet);
  }

  filterLoans(search: string = '', loanType: string = 'all') {
    this.filteredLoans = this.loans.filter(loan => {
      const matchesType = loanType === 'all' || loan.loanType === loanType;
      const matchesSearch = !search || Object.keys(loan).some(column => 
        loan[column]?.toString().toLowerCase().includes(search.toLowerCase())
      );
      return matchesType && matchesSearch;
    });
  }

  applyLoan(loanId: number) {
    this.router.navigate(['/api/addloanapplication', loanId]);
  }

  isApplied(loanId: number): boolean {
    return this.appliedLoans.has(loanId);
  }
}
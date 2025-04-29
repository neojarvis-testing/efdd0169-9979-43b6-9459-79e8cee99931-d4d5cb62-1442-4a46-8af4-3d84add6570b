import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {

  loans: Loan[] = [];

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.getAllLoans();
  }


  getAllLoans(): void {
    this.loanService.getAllLoans().subscribe((data: Loan[]) => {
      this.loans = data;
    });
  }

  deleteLoan(id: number): void {
    this.loanService.deleteLoan(id).subscribe(() => {
      this.getAllLoans();
    });
  }



}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {
  loanform: FormGroup;
  id: number;
  loan: Loan;
  editMode: boolean = false;
  toastMessage: string = '';

  constructor(
    private service: LoanService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loanform = this.fb.group({
      loanId: [''],
      loanType: ['', Validators.required],
      description: ['', Validators.required],
      interestRate: [null, [Validators.required, Validators.min(1)]],
      maximumAmount: [null, [Validators.required, Validators.min(500)]],
      repaymentTenure: [null, Validators.required],
      eligibility: ['', Validators.required],
      documentsRequired: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.editMode = false;
    } else {
      this.editMode = true;
      this.service.getLoanById(this.id).subscribe((data) => {
        this.loanform.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.loanform.valid) {
      if (this.editMode) {
        this.service.updateLoan(this.id, this.loanform.value).subscribe(
          () => {
            this.showToast('Loan updated successfully!');
            setTimeout(() => this.router.navigate(['/viewloan']), 1000);
          },
          (error) => {
            console.error('Error updating loan:', error);
            this.showToast('Failed to update loan.');
          }
        );
      } else {
        this.service.addLoan(this.loanform.value).subscribe(
          () => {
            this.showToast('Loan added successfully!');
            setTimeout(() => this.router.navigate(['/viewloan']), 1000);
          },
          (error) => {
            console.error('Error adding loan:', error);
            this.showToast('Failed to add loan.');
          }
        );
      }
    } else {
      this.showToast('Invalid Form Input!');
    }
  }

  get f() {
    return this.loanform.controls;
  }

  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = ''), 4000);
  }
}
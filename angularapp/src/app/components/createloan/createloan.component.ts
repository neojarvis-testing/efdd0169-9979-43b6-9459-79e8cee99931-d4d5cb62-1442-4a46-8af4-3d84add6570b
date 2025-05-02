import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit, OnDestroy {
  loanform: FormGroup;
  id: number;
  loan: Loan;
  editMode: boolean = false;
  toastMessage: string = '';
  private unsubscribe$ = new Subject<void>();
 
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
this.editMode = !!this.id;
 
    if (this.editMode) {
this.service.getLoanById(this.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.loanform.patchValue(data);
        });
    }
  }
 
  onSubmit(): void {
    if (!this.loanform.valid) {
      this.showToast('Invalid Form Input!');
      return;
    }
 
    const loanAction$ = this.editMode
? this.service.updateLoan(this.id, this.loanform.value)
      : this.service.addLoan(this.loanform.value);
 
    loanAction$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          const successMsg = this.editMode ? 'Loan updated successfully!' : 'Loan added successfully!';
          this.showToast(successMsg);
          setTimeout(() => this.router.navigate(['/viewloan']), 1000);
        },
        (error) => {
          console.error('Loan operation failed:', error);
          this.showToast(this.editMode ? 'Failed to update loan.' : 'Failed to add loan.');
        }
      );
  }
 
  get f() {
    return this.loanform.controls;
  }
 
  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = ''), 4000);
  }
 
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
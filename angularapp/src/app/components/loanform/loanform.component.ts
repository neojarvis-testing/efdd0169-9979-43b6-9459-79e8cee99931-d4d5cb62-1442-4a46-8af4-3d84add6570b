import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
 
@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})
export class LoanformComponent implements OnInit, OnDestroy {
 
  loanApplicationForm: FormGroup;
  loanId: any;
  selectedFile: File | null = null;
  toastMessage: string = '';
  private unsubscribe$ = new Subject<void>();
 
  constructor(
    private service: LoanService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loanApplicationForm = this.fb.group({
      farmLocation: ['', Validators.required],
      farmerAddress: ['', Validators.required],
      farmSizeInAcres: [null, Validators.required],
      farmpurpose: ['', Validators.required],
      file: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.loanId = this.route.snapshot.paramMap.get('id');
  }
 
  onSubmit(): void {
    if (!this.loanApplicationForm.valid) {
      this.showToast('Invalid Form Input!');
      return;
    }
 
    const loanApplication: LoanApplication = {
      ...this.loanApplicationForm.value,
      user: { userId: +sessionStorage.getItem('userId') },
      loan: { loanId: +this.loanId }
    };
 
    this.service.addLoanApplication(loanApplication)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.showToast('Loan Application Submitted Successfully!');
          setTimeout(() => this.router.navigate(['/userappliedloans']), 1000);
        },
        (error) => {
          console.error('Error:', error);
          this.showToast('Failed to submit loan application.');
        }
      );
  }
 
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
 
  get f() {
    return this.loanApplicationForm.controls;
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
 
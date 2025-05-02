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
    private readonly service: LoanService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.loanApplicationForm = this.fb.group({
      farmLocation: ['', Validators.required],
      farmerAddress: ['', Validators.required],
      farmSizeInAcres: [null, Validators.required],
      farmpurpose: ['', Validators.required],
      file: ['']

    })
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
 
  get f() {
    return this.loanApplicationForm.controls;
  }
  
  onFileChange(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0]; // Get the selected file
      const reader = new FileReader();
      
      reader.onload = () => {
        if (fileType === 'file') {
          console.log('Photo added');
          // Update the FormControl value with the base64 string
          this.loanApplicationForm.get('file')?.setValue(reader.result as string);
        }
      };
  
      reader.readAsDataURL(file); // Convert the file to Base64 format
    }
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

 
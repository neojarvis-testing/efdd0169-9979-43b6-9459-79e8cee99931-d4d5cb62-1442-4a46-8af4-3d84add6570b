import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})

export class LoanformComponent implements OnInit {
  loanApplicationForm: FormGroup
  loan: LoanApplication[]
  constructor(private service: LoanService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.loanApplicationForm = this.fb.group({
      farmLocation: ['', Validators.required],
      farmerAddress: ['', Validators.required],
      farmSizeInAcres: [null, Validators.required],
      farmPurpose: ['', Validators.required],
      file: ['', Validators.required]

    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loanApplicationForm.valid) {
      console.log(this.loanApplicationForm.value); // Log form values
      this.service.addLoanApplication(this.loanApplicationForm.value).subscribe(
        (data) => {
          alert("Loan Application Added Successfully!!!");
          this.router.navigate(['/userappliedloan']);
        },
        (error) => {
          console.log("Error: " + JSON.stringify(error));
        }
      );
    } else {
      alert("Invalid Form input");
    }
  }

  get f() {
    return this.loanApplicationForm.controls;
  }

}

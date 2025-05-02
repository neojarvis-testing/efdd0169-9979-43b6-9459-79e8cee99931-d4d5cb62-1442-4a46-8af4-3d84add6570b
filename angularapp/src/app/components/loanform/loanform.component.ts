import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { User } from 'src/app/models/user.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css']
})

export class LoanformComponent implements OnInit {
  
  loanApplicationForm: FormGroup
  loan: LoanApplication[]
  loanId:any
  selectedFile: File | null = null
  constructor(private service: LoanService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.loanApplicationForm = this.fb.group({
      farmLocation: ['', Validators.required],
      farmerAddress: ['', Validators.required],
      farmSizeInAcres: [null, Validators.required],
      farmpurpose: ['', Validators.required],
      file: ['']

    })
  }

  ngOnInit(): void {
   this.loanId= this.route.snapshot.paramMap.get('id')
  }

  onSubmit(): void {
    if (this.loanApplicationForm.valid) {
      console.log(this.loanApplicationForm.value); // Log form values
      let loanApplication:LoanApplication={
        ...this.loanApplicationForm.value,
        user:{
          userId: +sessionStorage.getItem('userId') 
         }, 
        loan: { 
          loanId: +this.loanId
         }
        }

      console.log(loanApplication)
      this.service.addLoanApplication(loanApplication).subscribe(
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

}

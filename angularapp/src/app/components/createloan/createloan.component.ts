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

  loanform:FormGroup
  id:number
  loan:Loan[]
  constructor(private service:LoanService,private fb:FormBuilder, private router:Router, private route:ActivatedRoute) {
    this.loanform=this.fb.group({
      loanId:['',],
      loanType:['',Validators.required],
      description:['',Validators.required],
      interestRate:[null,[Validators.required,Validators.min(1)]],
      maximumAmount:[null,[Validators.required,Validators.min(500)]],
      repaymentTenure:[null,Validators.required],
      eligibility:['',Validators.required],
      documentsRequired:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }
  onSubmit():void{
    if(this.loanform.valid){
      this.service.addLoan(this.loanform.value).subscribe((data)=>{
        alert("ADD Successfull!!")
        this.router.navigate['/viewloan']
      },(error)=>{
        console.log("Error: "+JSON.stringify(error))
      })
    }
    else
     alert("Invalid Form Input!!!")

  }
   get f(){
    return this.loanform.controls;
  }
 
}

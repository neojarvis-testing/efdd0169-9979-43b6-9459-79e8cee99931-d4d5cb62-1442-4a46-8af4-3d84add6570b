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
  loanApplicationForm :FormGroup
  loan:LoanApplication[]
  id:number
  addMode:boolean=false
  constructor(private service:LoanService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute) {
    this.loanApplicationForm=this.fb.group({
    loanApplicationId:[''],
    submissionDate:[''],
    loanStatus:[''],          
    farmLocation:['',Validators.required], 
    farmerAddress:['',Validators.required], 
    farmSizeInAcres:['',Validators.required], 
    farmPurpose:['',Validators.required], 
    file:['',Validators.required]

    })
   }

  ngOnInit(): void {
     this.id=+ this.route.snapshot.paramMap.get('id')
    console.log(this.id)
    if(!this.id){
      this.addMode=false
    }
  }
  onSubmit():void{
    if(this.loanApplicationForm.valid){
      if(this.addMode){
      this.service.addLoanApplication(this.loanApplicationForm.value).subscribe((data)=>{
        alert("Loan Application Added Successfully!!!")
      },(error)=>{
        console.log("Error: "+JSON.stringify(error))
      })
    }else{
      alert("Invalid Form input")
    }
  }
  }
  get f(){
    return this.loanApplicationForm.controls;
  }

}

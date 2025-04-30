import { Loan } from "./loan.model";

export interface LoanApplication{
    loanApplicationId?:number;
    userId?:number;
    loanId?:number;
    submissionDate:string;
    loanStatus:number;          
    farmLocation:string;
    farmerAddress:string;
    farmSizeInAcres:number;
    farmpurpose:string;
    file:string;
    loan:Loan
}

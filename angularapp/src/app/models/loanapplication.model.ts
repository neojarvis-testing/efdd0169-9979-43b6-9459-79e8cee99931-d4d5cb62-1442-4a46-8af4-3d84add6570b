import { Loan } from "./loan.model";
import { User } from "./user.model";


export interface LoanApplication{
    loanApplicationId?:number;
    userId?:number;
    loanId?:number;
    submissionDate:string;
    loanStatus:string;          
    farmLocation:string;
    farmerAddress:string;
    farmSizeInAcres:number;
    farmpurpose:string;
    file:string;
    user?:User;
    loan?:Loan;
}


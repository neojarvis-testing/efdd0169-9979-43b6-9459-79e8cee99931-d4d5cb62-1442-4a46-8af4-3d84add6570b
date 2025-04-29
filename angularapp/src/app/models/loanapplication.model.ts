export interface LoanApplication{
    loanApplicationId?:number;
    userId?:number;
    loanId?:number;
    submissionDate:string;
    loanStatus:string;          
    farmLocation:string;
    farmerAddress:string;
    farmSizeInAcres:number;
    farmPurpose:string;
    file:string;
}
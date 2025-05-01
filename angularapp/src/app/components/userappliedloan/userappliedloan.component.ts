

// import { Component, OnInit } from '@angular/core';
// import { LoanApplication } from 'src/app/models/loanapplication.model';
// import { LoanService } from 'src/app/services/loan.service';

// @Component({
//   selector: 'app-userappliedloan',
//   templateUrl: './userappliedloan.component.html',
//   styleUrls: ['./userappliedloan.component.css']
// })
// export class UserappliedloanComponent implements OnInit {
//   loans: LoanApplication[] = [];
//   search: string = '';
//   filteredLoans: LoanApplication[] = [];
//   selectedLoan: LoanApplication | null = null;
//   showDeletePopup: boolean = false;
//   loanToDelete: number | null = null;
//   noDataFound: boolean = false;
//   showDialog = false;

//   constructor(private loanService: LoanService) {}

//   ngOnInit(): void {
//     this.loadLoans();
//   }

//   loadLoans(): void {
//     this.loanService.getAllLoanApplications().subscribe(
//       (data: LoanApplication[]) => {
//         this.loans = data;
//         this.filteredLoans = [...this.loans];
//         this.noDataFound = this.loans.length === 0;
//       },
//       error => {
//         console.error('Error fetching loan applications', error);
//         this.noDataFound = true;
//       }
//     );
//   }

//   showDetails(loan: LoanApplication): void {
//     this.selectedLoan = loan;
//     this.showDialog = true;
//   }
//   onDialogConfirm(): void {
//     this.showDialog = false;
//     this.selectedLoan = null;
//   }

//   closeDetails(): void {
//     this.selectedLoan = null;
//   }

//   confirmDelete(loanApplicationId: number): void {
//     this.loanToDelete = loanApplicationId;
//     this.showDeletePopup = true;
//   }

//   deleteLoanApplication(): void {
//     if (this.loanToDelete !== null) {
//       this.loanService.deleteLoanApplication(this.loanToDelete).subscribe(
//         () => {
//           this.loadLoans();
//           this.closeDeletePopup();
//         },
//         error => {
//           console.error('Error deleting loan application', error);
//         }
//       );
//     }
//   }

//   closeDeletePopup(): void {
//     this.showDeletePopup = false;
//     this.loanToDelete = null;
//   }

//   onSearch(event: any): void {
//     this.search = event.target.value.toLowerCase();

//     if (!this.search || !this.loans) {
//       this.filteredLoans = [...this.loans];
//       return;
//     }

//     this.filteredLoans = this.loans.filter(item => {
//       return Object.keys(item).some(column => {
//         const value = item[column];
//         // Handle nested objects like `loanType`
//         if (column === 'loan' && value) {
//           return value.loanType.toLowerCase().includes(this.search);
//         }
//         return value ? value.toString().toLowerCase().includes(this.search) : false;
//       });
//     });
//   }
// }






import { Component, OnInit } from '@angular/core';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { ChangeDetectorRef } from '@angular/core';
 
@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {
  loans: LoanApplication[] = [];
  filteredLoans: LoanApplication[] = [];
  selectedLoan: LoanApplication | null = null;
  search: string = '';
  showDialog: boolean = false;
  showDeletePopup: boolean = false;
  loanToDelete: number | null = null;
  noDataFound: boolean = false;
  toastMessage: string = '';
 
  constructor(
    private loanService: LoanService,
    private cdRef: ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    this.loadLoans();
  }
 
  loadLoans(): void {
    this.loanService.getAllLoanApplications().subscribe(
      (data: LoanApplication[]) => {
this.loans = data;
        this.filteredLoans = [...data];
        this.noDataFound = data.length === 0;
      },
      error => {
        console.error('Error fetching loan applications', error);
        this.noDataFound = true;
        this.showToast('Failed to load loan applications');
      }
    );
  }
 
  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.search = query;
 
    if (!query) {
this.filteredLoans = [...this.loans];
      return;
    }
 
this.filteredLoans = this.loans.filter(item =>
      Object.keys(item).some(key => {
        const value = item[key];
        if (key === 'loan' && value) {
          return value.loanType?.toLowerCase().includes(query);
        }
        return value?.toString().toLowerCase().includes(query);
      })
    );
  }
 
  showDetails(loan: LoanApplication): void {
    this.selectedLoan = loan;
    this.showDialog = true;
  }
 
  onDialogConfirm(): void {
    this.showDialog = false;
    this.selectedLoan = null;
  }
 
  confirmDelete(loanId: number): void {
    this.loanToDelete = loanId;
    this.showDeletePopup = true;
  }
 
  deleteLoanApplication(): void {
    if (this.loanToDelete !== null) {
      this.loanService.deleteLoanApplication(this.loanToDelete).subscribe(
        () => {
          this.showToast('Loan application deleted.');
          this.loadLoans();
          this.closeDeletePopup();
        },
        error => {
          console.error('Error deleting loan application', error);
          this.showToast('Failed to delete loan.');
        }
      );
    }
  }
 
  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.loanToDelete = null;
  }
 
  showToast(message: string): void {
    this.toastMessage = message;
    this.cdRef.detectChanges(); // ensures toast appears
    setTimeout(() => {
      this.toastMessage = '';
      this.cdRef.detectChanges(); // ensures it disappears
    }, 4000);
  }
}
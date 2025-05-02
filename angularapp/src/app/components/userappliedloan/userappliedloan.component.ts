

import { Component, OnInit } from '@angular/core';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-userappliedloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {
  loans: LoanApplication[] = [];
  search: string = '';
  filteredLoans: LoanApplication[] = [];
  selectedLoan: LoanApplication | null = null;
  showDeletePopup: boolean = false;
  loanToDelete: number | null = null;
  noDataFound: boolean = false;
  showDialog = false;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getAllLoanApplications().subscribe(
      (data: LoanApplication[]) => {
        this.loans = data;
        this.filteredLoans = [...this.loans];
        this.noDataFound = this.loans.length === 0;
      },
      error => {
        console.error('Error fetching loan applications', error);
        this.noDataFound = true;
      }
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

  closeDetails(): void {
    this.selectedLoan = null;
  }

  confirmDelete(loanApplicationId: number): void {
    this.loanToDelete = loanApplicationId;
    this.showDeletePopup = true;
  }

  deleteLoanApplication(): void {
    if (this.loanToDelete !== null) {
      this.loanService.deleteLoanApplication(this.loanToDelete).subscribe(
        () => {
          this.loadLoans();
          this.closeDeletePopup();
        },
        error => {
          console.error('Error deleting loan application', error);
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.loanToDelete = null;
  }

  onSearch(event: any): void {
    this.search = event.target.value.toLowerCase();

    if (!this.search || !this.loans) {
      this.filteredLoans = [...this.loans];
      return;
    }

    this.filteredLoans = this.loans.filter(item => {
      return Object.keys(item).some(column => {
        const value = item[column];
        // Handle nested objects like `loanType`
        if (column === 'loan' && value) {
          return value.loanType.toLowerCase().includes(this.search);
        }
        return value ? value.toString().toLowerCase().includes(this.search) : false;
      });
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { LoanApplication } from 'src/app/models/loanapplication.model';
// import { LoanService } from 'src/app/services/loan.service';

// @Component({
//   selector: 'app-userappliedloan',
//   templateUrl: './userappliedloan.component.html',
//   styleUrls: ['./userappliedloan.component.css']
// })
// export class UserappliedloanComponent implements OnInit {
//   loans: LoanApplication[] = [];
//   filteredLoans: LoanApplication[] = [];
//   selectedLoan: LoanApplication | null = null;
//   showDeletePopup: boolean = false;
//   loanToDelete: number | null = null;
//   noDataFound: boolean = false;
//   showDialog = false;

//   searchControl = new FormControl('');

//   constructor(private loanService: LoanService) {}

//   ngOnInit(): void {
//     this.loadLoans();

//     this.searchControl.valueChanges.subscribe(searchTerm => {
//       this.filterLoans(searchTerm?.toLowerCase() || '');
//     });
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

//   filterLoans(search: string): void {
//     if (!search || !this.loans) {
//       this.filteredLoans = [...this.loans];
//       return;
//     }

//     this.filteredLoans = this.loans.filter(item => {
//       return Object.keys(item).some(column => {
//         const value = item[column];
//         if (column === 'loan' && value) {
//           return value.loanType.toLowerCase().includes(search);
//         }
//         return value ? value.toString().toLowerCase().includes(search) : false;
//       });
//     });
//   }

//   showDetails(loan: LoanApplication): void {
//     this.selectedLoan = loan;
//     this.showDialog = true;
//   }

//   onDialogConfirm(): void {
//     this.showDialog = false;
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
// }

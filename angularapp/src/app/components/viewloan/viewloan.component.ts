// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { catchError, takeUntil } from 'rxjs/operators';
// import { of, Subject } from 'rxjs';
// import { Loan } from 'src/app/models/loan.model';
// import { AuthService } from 'src/app/services/auth.service';
// import { LoanService } from 'src/app/services/loan.service';
// @Component({
//   selector: 'app-viewloan',
//   templateUrl: './viewloan.component.html',
//   styleUrls: ['./viewloan.component.css']
// })
// export class ViewloanComponent implements OnInit, OnDestroy {
//   loans: Loan[] = [];
//   filteredLoans: Loan[] = [];
//   paginatedLoans: Loan[] = [];
//   searchTerm: string = '';
//   errorMessage: string = '';
//   isAdmin: boolean = false;
//   currentPage: number = 1;
//   itemsPerPage: number = 5;
//   totalPages: number = 0;
//   pages: number[] = [];
//   isLoading: boolean = true;
//   private unsubscribe$ = new Subject<void>();
//   constructor(private loanService: LoanService, private authService: AuthService, private router: Router) {}
//   ngOnInit(): void {
//     this.getAllLoans();
//     this.checkUserRole();
//   }
//   getAllLoans(): void {
//     this.loanService.getAllLoans()
//       .pipe(
//         takeUntil(this.unsubscribe$),
//         catchError(error => {
//           this.errorMessage = 'Failed to load loans. Please try again later.';
//           console.error('Error fetching loans:', error);
//           return of([]);
//         })
//       )
//       .subscribe((data: Loan[]) => {
// this.loans = data;
//         this.filteredLoans = data;
//         this.updatePagination();
//         setTimeout(() => {
//           this.isLoading = false;
//         }, 1000);
//       });
//   }
//   filterLoans(): void {
// this.filteredLoans = this.loans.filter(loan =>
//       loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//     this.currentPage = 1;
//     this.updatePagination();
//   }
  
//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
//     this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
//     this.paginateLoans();
//   }
//   paginateLoans(): void {
//     const start = (this.currentPage - 1) * this.itemsPerPage;
//     const end = start + this.itemsPerPage;
//     this.paginatedLoans = this.filteredLoans.slice(start, end);
//   }
//   changePage(page: number, event: Event): void {
//     event.preventDefault();
//     if (page < 1 || page > this.totalPages) return;
//     this.currentPage = page;
//     this.paginateLoans();
//   }
//   checkUserRole(): void {
//     const userRole = this.authService.getUserRole();
//     this.isAdmin = userRole === 'ADMIN';
//   }
//   deleteLoan(id: number): void {
//     const confirmed = window.confirm('Are you sure you want to delete?');
//     if (confirmed) {
//       this.loanService.deleteLoan(id)
//         .pipe(takeUntil(this.unsubscribe$))
//         .subscribe(() => {
//           this.getAllLoans();
//         }, error => {
//           this.errorMessage = 'Failed to delete loan. Please try again later.';
//           console.error('Error deleting loan:', error);
//         });
//     }
//   }
//   applyLoan(loanId: number): void {
//     console.log(`Applying for loan with ID: ${loanId}`);
//     this.router.navigate(['/loanform', loanId]);
//   }
//   editLoan(loanId: number): void {
//     this.router.navigate(['/addloan', loanId]);
//   }
//   resetSearch(): void {
//     this.searchTerm = '';
//     this.filterLoans();
//   }
  
//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }
// }







import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Loan } from 'src/app/models/loan.model';
import { AuthService } from 'src/app/services/auth.service';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit, OnDestroy {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  paginatedLoans: Loan[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  toastMessage: string = '';
  confirmationModalVisible: boolean = false;
  confirmationMessage: string = '';
  confirmationCallback: () => void = () => {};
  isAdmin: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  isLoading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  constructor(private loanService: LoanService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllLoans();
    this.checkUserRole();
  }

  getAllLoans(): void {
    this.loanService.getAllLoans()
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(error => {
          this.errorMessage = 'Failed to load loans. Please try again later.';
          console.error('Error fetching loans:', error);
          return of([]);
        })
      )
      .subscribe((data: Loan[]) => {
        this.loans = data;
        this.filteredLoans = data;
        this.updatePagination();
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      });
  }

  filterLoans(): void {
    this.filteredLoans = this.loans.filter(loan =>
      loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.paginateLoans();
  }

  paginateLoans(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedLoans = this.filteredLoans.slice(start, end);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateLoans();
  }

  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'ADMIN';
  }

  showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = '';
    }, 4000);
  }

  showConfirmation(message: string, onConfirm: () => void): void {
    this.confirmationMessage = message;
    this.confirmationCallback = onConfirm;
    this.confirmationModalVisible = true;
  }

  onCancelConfirmation(): void {
    this.confirmationModalVisible = false;
  }

  onConfirmAction(): void {
    this.confirmationModalVisible = false;
    this.confirmationCallback();
  }

  confirmDelete(loanId: number): void {
    this.showConfirmation('Are you sure you want to delete this loan?', () => {
      this.deleteLoan(loanId);
    });
  }

  deleteLoan(id: number): void {
    this.loanService.deleteLoan(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.getAllLoans();
        this.showToast('Loan deleted successfully.');
      }, error => {
        this.errorMessage = 'Failed to delete loan. Please try again later.';
        console.error('Error deleting loan:', error);
        this.showToast(this.errorMessage);
      });
  }

  applyLoan(loanId: number): void {
    console.log(`Applying for loan with ID: ${loanId}`);
    this.router.navigate(['/loanform', loanId]);
  }

  editLoan(loanId: number): void {
    this.router.navigate(['/addloan', loanId]);
  }

  resetSearch(): void {
    this.searchTerm = '';
    this.filterLoans();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

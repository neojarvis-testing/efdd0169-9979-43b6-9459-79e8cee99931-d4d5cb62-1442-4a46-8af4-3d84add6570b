import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { AdmineditloanComponent } from './components/admineditloan/admineditloan.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    HomePageComponent,
    ViewloanComponent,
    AdmineditloanComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    AuthguardComponent,
    CreateloanComponent,
    LoanformComponent,
    RequestedloanComponent,
    UseraddfeedbackComponent,
    UserappliedloanComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    UserviewloanComponent
  ],
    
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

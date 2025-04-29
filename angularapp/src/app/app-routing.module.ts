import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewloanComponent } from './components/viewloan/viewloan.component';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoanformComponent } from './components/loanform/loanform.component';

const routes: Routes = [
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'addloanapplication', component:LoanformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

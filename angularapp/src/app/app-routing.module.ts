import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewloanComponent } from './components/viewloan/viewloan.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoanformComponent } from './components/loanform/loanform.component';
import { CreateloanComponent } from './components/createloan/createloan.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { RequestedloanComponent } from './components/requestedloan/requestedloan.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';


const routes: Routes = [
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'addloanapplication', component:LoanformComponent},
  {path:'addloanapplication/:id', component:LoanformComponent},
  {path:'viewloan',component:ViewloanComponent},
  {path:'addloan', component:CreateloanComponent},
  {path:'adminnav', component:AdminnavComponent},
  {path:'viewfeedback', component:AdminviewfeedbackComponent},
  {path:'requestedloan', component:RequestedloanComponent},
  {path:'useraddfeedback/:userId', component:UseraddfeedbackComponent},
  {path:'userviewloan', component: UserviewloanComponent },
  {path:'userviewfeedback/:userId', component: UserviewfeedbackComponent }
       
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

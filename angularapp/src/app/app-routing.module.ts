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
import { NavbarComponent } from './components/navbar/navbar.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewloanComponent } from './components/userviewloan/userviewloan.component';
import { UserappliedloanComponent } from './components/userappliedloan/userappliedloan.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { CombinedGuard } from './combined.guard';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'addloanapplication', component:LoanformComponent,canActivate:[UserGuard]},
  {path:'addloanapplication.:id', component:LoanformComponent,canActivate:[UserGuard]},
  {path:'viewloan',component:ViewloanComponent,canActivate:[CombinedGuard]},
  {path:'addloan', component:CreateloanComponent,canActivate:[AdminGuard]},
  {path:'addloan/:id', component:CreateloanComponent,canActivate:[AdminGuard]},
  {path:'adminnav', component:AdminnavComponent,canActivate:[AdminGuard]},
  {path:'viewfeedback', component:AdminviewfeedbackComponent,canActivate:[AdminGuard]},
  {path:'requestedloan', component:RequestedloanComponent},
  {path:'useraddfeedback', component:UseraddfeedbackComponent,canActivate:[UserGuard]},
  {path:'userviewloan', component: UserviewloanComponent,canActivate:[UserGuard]},
  {path:'userviewfeedback', component: UserviewfeedbackComponent,canActivate:[UserGuard]},
 {path:'userviewfeedback/:id', component: UserviewfeedbackComponent,canActivate:[UserGuard]},
  {path:'navbar', component:NavbarComponent},
  { path: 'loanform/:id', component: LoanformComponent,canActivate:[UserGuard]},
  {path:'userappliedloans', component:UserappliedloanComponent,canActivate:[UserGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { tokenGuard } from './utils/token.guard';
import { userExitGuard } from './guards/user-exit.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductComponent } from './components/dashboard/product/product.component';

export const routes: Routes = [
  {path:"",redirectTo:'/logIn', pathMatch:'full'},
  {path:"singIn",component : SingInComponent},
  {path:"logIn",component : LoginComponent, canDeactivate:[userExitGuard]},
  {path:"forgotPassword", component: ForgotPasswordComponent},
  {path:"resetPassword" ,component: ResetPasswordComponent},
  {path:'product',component:ProductComponent},
  {path:"dashboard",component : DashboardComponent, canActivate:[tokenGuard],canDeactivate:[userExitGuard]},
  {path:"errorPage",component : ErrorpageComponent},
  {path:"maintenancePage", component: MaintenanceComponent},
  {path:"**",redirectTo:"/errorPage",pathMatch:'full'},
];

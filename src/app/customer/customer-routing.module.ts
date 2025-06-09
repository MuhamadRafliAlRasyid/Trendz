import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { NewPasswordPage } from './new-password/new-password.page';
import { VerifyPage } from './verify/verify.page';
import { CompleteProfilePage } from './complete-profile/complete-profile.page';
import { HomePage } from './home/home.page';
import { PaymentPage } from './checkout/payment.page';

// Define the routes for the customer module
const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'signup', component: SignupPage },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'new-password', component: NewPasswordPage },
  { path: 'verify', component: VerifyPage },
  { path: 'complete-profile', component: CompleteProfilePage },
  { path: 'home', component: HomePage },
  { path: 'payment', component: PaymentPage },
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Default route
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule], // Add CommonModule for common directives
  exports: [RouterModule], // Export RouterModule so it can be used in other modules
})
export class CustomerRoutingModule {}

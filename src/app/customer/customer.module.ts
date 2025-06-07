import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { NewPasswordPage } from './new-password/new-password.page';
import { VerifyPage } from './verify/verify.page';
import { CompleteProfilePage } from './complete-profile/complete-profile.page';
import { HomePage } from './home/home.page';
import { PaymentPage } from './payment/payment.page';

@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    NewPasswordPage,
    VerifyPage,
    CompleteProfilePage,
    HomePage,
    PaymentPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Tambahkan CUSTOM_ELEMENTS_SCHEMA
})
export class CustomerModule {}

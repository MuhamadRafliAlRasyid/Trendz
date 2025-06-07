import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NewPasswordPage {
  username = '';
  email = '';
  password = '';
  acceptedTerms = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/splash-restore']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}


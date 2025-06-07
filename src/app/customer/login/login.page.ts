import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // <-- Make sure this is imported
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],  // <-- Ensure IonicModule is included
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Please fill in all fields.');
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.loginCustomer(credentials).subscribe({
      next: (response) => {
        if (response.data && response.data.token) {
          this.authService.saveUser(response.data);

          const isVerified = response.data.user.email_verified_at !== null;

          if (isVerified) {
            this.router.navigate(['/home']);
          } else {
            alert('Please verify your email before continuing.');
            this.router.navigate(['/verify'], {
              queryParams: { email: this.email }
            });
          }
        } else {
          alert('Unexpected login response.');
        }
      },
      error: (err) => {
        console.error('Login Error:', err);

        if (err.status === 403 && err.error?.message?.includes('verify')) {
          alert('Please verify your email before continuing.');
          this.router.navigate(['/verify'], {
            queryParams: { email: this.email }
          });
        } else {
          alert(err.error?.message || 'Login failed.');
        }
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}

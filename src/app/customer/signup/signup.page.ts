import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,HttpClientModule],
})
export class SignupPage {
  username = '';
  email = '';
  password = '';
  password_confirmation = '';
  acceptedTerms = false;

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    if (!this.username || !this.email || !this.password || !this.password_confirmation) {
      alert('Please fill in all fields.');
      return;
    }

    if (this.password !== this.password_confirmation) {
      alert('Password and confirmation do not match.');
      return;
    }

    if (!this.acceptedTerms) {
      alert('Please accept the Terms & Conditions.');
      return;
    }

    const registerData = {
      name: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    this.authService.registerCustomer(registerData).subscribe({
      next: (res) => {
        alert(res.message);
        this.authService.saveUser(res.data); // Save user data and token

        // Navigate to the verification page
        this.router.navigate(['/verify'], {
          queryParams: { email: res.data.user.email },
        });
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert(err.error?.message || 'Registration failed.');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}

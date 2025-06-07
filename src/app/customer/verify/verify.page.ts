import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class VerifyPage implements OnInit {
  otp1: string = '';
  otp2: string = '';
  otp3: string = '';
  otp4: string = '';
  email: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });
  }

  onVerify() {
    const code = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}`.trim();

    if (!code || !this.email) {
      alert('Please enter the verification code.');
      return;
    }

    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      alert('Code must be a 4-digit number.');
      return;
    }

    this.authService.verifyEmail({ email: this.email, code }).subscribe({
      next: (res) => {
        alert(res.message || 'Email verified successfully.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Verification error:', err);
        alert(err.error?.message || 'Verification failed.');
      }
    });
  }

  resendVerification() {
    this.authService.resendVerificationEmail().subscribe({
      next: () => alert('Verification code has been resent.'),
      error: (err) => {
        console.error('Resend error:', err);
        alert('Failed to resend verification code.');
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  moveToNext(event: any, nextInput: HTMLInputElement) {
    const input = event.target;
    if (input.value && input.value.length === 1) {
      nextInput.focus();
    }
  }
}

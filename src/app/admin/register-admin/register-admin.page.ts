import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Pastikan AuthService sudah di-implementasi

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.page.html',
  styleUrls: ['./register-admin.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RegisterAdminPage {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    // Cek apakah ada field yang kosong
    if (!this.name || !this.email || !this.password || !this.password_confirmation) {
      alert('Please fill in all fields.');
      return;
    }

    // Validasi kecocokan password
    if (this.password !== this.password_confirmation) {
      alert('Password and confirmation do not match.');
      return;
    }

    // Data yang akan dikirim ke backend
    const registerData = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    // Panggil AuthService untuk registrasi admin
    this.authService.registerAdmin(registerData).subscribe({
      next: (res) => {
        alert(res.message);  // Pesan sukses
        this.router.navigate(['/admin/login']);  // Arahkan ke halaman login setelah berhasil
      },
      error: (err) => {
        console.error('Registration error:', err);  // Log error jika gagal
        alert(err.error?.message || 'Registration failed.');
      }
    });
  }
}

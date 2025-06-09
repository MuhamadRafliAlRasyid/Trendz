import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.page.html',
  styleUrls: ['./login-admin.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginAdminPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
  // Cek apakah email dan password telah diisi
  if (!this.email || !this.password) {
    alert('Please fill in all fields.');
    return;
  }

  const credentials = { email: this.email, password: this.password };

  // Panggil AuthService untuk login admin
  this.authService.loginAdmin(credentials).subscribe({
    next: (res) => {
      alert('Admin login successful!');
      this.authService.saveUser(res.data);  // Simpan data pengguna dan token
      this.router.navigateByUrl('/admin/dashboard')
  .then(success => console.log('Navigation success:', success))
  .catch(err => console.error('Navigation failed:', err));

  // Arahkan ke halaman dashboard admin setelah berhasil login
    },
    error: (err) => {
      console.error('Login failed', err);  // Log error jika login gagal
      alert(err.error?.message || 'Login failed.');
    }
  });
}

}

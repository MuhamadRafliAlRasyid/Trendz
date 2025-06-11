import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AccountSettingsPage implements OnInit {
  user: any = {};
  selectedImage: any = null;
  showPassword: boolean = false; // Untuk toggle password visibility

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
    } else {
      console.error('User not logged in');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updateAccountSettings() {
  if (!this.user.name) {
    alert('Name is required');
    return;
  }

  const formData = new FormData();
  formData.append('_method', 'PUT');
  formData.append('name', this.user.name);

  // Jika password diisi, kirim juga konfirmasinya
  if (this.user.password) {
    if (this.user.password !== this.user.password_confirmation) {
      alert('Password confirmation does not match');
      return;
    }
    formData.append('password', this.user.password);
    formData.append('password_confirmation', this.user.password_confirmation);
  }

  if (this.selectedImage) {
    formData.append('image', this.selectedImage, this.selectedImage.name);
  }

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  this.http.post('http://localhost:8000/api/profile', formData, { headers })
    .subscribe(
      (response) => {
        console.log('Account settings updated successfully:', response);
        alert('Account settings updated successfully!');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error updating account settings:', error);
        alert(error.error?.message || 'Failed to update account settings');
      }
    );
}

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courier-login',
  templateUrl: './courier-login.page.html',
  styleUrls: ['./courier-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CourierLoginPage {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router,private authService: AuthService,) {}

  login() {
    this.http.post<any>('http://localhost:8000/api/login/courier', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.saveUser(res);
        this.router.navigate(['/kurir-home']);
      },
      error: (err) => {
        alert('Login gagal. Cek email & password!');
      }
    });
  }
}

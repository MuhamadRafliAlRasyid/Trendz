import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Sesuaikan dengan base URL API kamu

  constructor(private http: HttpClient) {}

  // Register Customer
  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/customer`, data);
  }

  // Login Customer
  loginCustomer(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/customer`, credentials);
  }

  // Register Admin
  registerAdmin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/admin`, data);
  }

  // Login Admin
  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/admin`, credentials);
  }

  // Simpan user dan token ke localStorage
  saveUser(data: any): void {
    const user = data.user;

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user_id', String(user.id));
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }
  }

  // Logout (butuh token)
  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  // Ambil user dari localStorage
  getUser(): any {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Gagal parse user JSON:', e);
      return null;
    }
  }

  // Ambil token dari localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Cek apakah user login
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cek apakah email user sudah diverifikasi
  isVerified(): boolean {
    const user = this.getUser();
    return user?.email_verified_at != null;
  }

  // Verifikasi email (OTP)
  verifyEmail(data: { email: string; code: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, data);
  }

  // Kirim ulang verifikasi (butuh token)
  resendVerificationEmail(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/resend-verification`, {}, { headers });
  }
}

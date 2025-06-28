import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Ganti sesuai backend kamu

  constructor(private http: HttpClient) {}

  // ===== REGISTER SECTION =====
  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/customer`, data);
  }

  registerAdmin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/admin`, data);
  }

  registerCourier(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register/courier`, data);
}


  // ===== LOGIN SECTION =====
  loginCustomer(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/customer`, credentials);
  }

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/admin`, credentials);
  }

  loginCourier(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/courier`, credentials);
  }

  // ===== AUTH MANAGEMENT =====
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isVerified(): boolean {
    const user = this.getUser();
    return user?.email_verified_at != null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user?.role || null;
  }

  logout(): Observable<any> {
  const token = this.getToken();
  if (!token) {
    // Token tidak ada, tetap hapus localStorage dan redirect manual
    localStorage.removeItem('token');
    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
}


  // ===== VERIFICATION SECTION =====
  verifyEmail(data: { email: string; code: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-email`, data);
  }

  resendVerificationEmail(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/resend-verification`, {}, { headers });
  }

  // ===== PROFILE / AUTH USER DATA =====
  getProfile(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }
  getCourierDeliveries(): Observable<any> {
  const token = this.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrl}/courier/deliveries`, { headers });
}

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-courier-dashboard',
  templateUrl: './courier-dashboard.page.html',
  styleUrls: ['./courier-dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CourierDashboardPage implements OnInit {
  deliveries: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchDeliveries();
  }

 fetchDeliveries() {
  const token = this.authService.getToken();
  if (!token) {
    console.error('Token tidak ditemukan. Pengguna belum login.');
    this.router.navigate(['/loginKurir']);
    return;
  }

  const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

  this.http.get<any>('http://localhost:8000/api/courier/deliveries', { headers }).subscribe({
    next: (data) => {
      // Cek apakah data.data array
      this.deliveries = Array.isArray(data) ? data : data.data ?? [];
    },
    error: (err) => {
      console.error('Gagal ambil pengiriman', err);
      if (err.status === 401) {
        alert('Sesi berakhir. Silakan login ulang.');
        this.authService.logout().subscribe(() => {
          localStorage.removeItem('token');
          this.router.navigate(['/loginKurir']);
        });
      }
    }
  });
}


  updateStatus(deliveryId: number) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.patch(`http://localhost:8000/api/courier/deliveries/${deliveryId}/status`, {
      status: 'done'
    }, { headers }).subscribe(() => {
      alert('Status diperbarui');
      this.fetchDeliveries();
    });
  }

  updateLocation(deliveryId: number) {
    Geolocation.getCurrentPosition().then((position) => {
      const token = this.authService.getToken();
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      this.http.patch(`http://localhost:8000/api/courier/deliveries/${deliveryId}/location`, {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }, { headers }).subscribe(() => {
        console.log('Lokasi berhasil dikirim');
      });
    }).catch(err => {
      console.error('Gagal mendapatkan lokasi:', err);
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/loginKurir']);
    });
  }
}

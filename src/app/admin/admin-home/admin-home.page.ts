import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register komponen yang digunakan
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { AuthService } from 'src/app/services/auth.service'; // ⬅️ Pastikan ini sesuai path kamu

@Component({
  standalone: true,
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AdminHomePage implements OnInit {
  totalProducts: number = 0;
  totalOrders: number = 0;
  totalUsers: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService // ⬅️ Tambah ini
  ) {}

  ngOnInit() {
    this.fetchDashboardData();
    this.initSalesChart();
  }

  fetchDashboardData() {
  const token = this.authService.getToken(); // Ambil token dari localStorage atau service

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'  // WAJIB agar Laravel tahu kita minta JSON
  });

  const apiUrl = `${this.authService['apiUrl']}/admin/dashboard`;

  this.http.get<any>(apiUrl, { headers }).subscribe({
    next: (data) => {
      this.totalProducts = data.totalProducts;
      this.totalOrders = data.totalOrders;
      this.totalUsers = data.totalUsers;
      // Kamu juga bisa pakai data.monthlyRevenue kalau mau
    },
    error: (err) => {
      console.error('Gagal ambil data dashboard:', err);
    }
  });
}


  initSalesChart() {
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 9],
          borderColor: '#FF5C39',
          backgroundColor: 'rgba(255,92,57,0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  openMenu() {
    document.querySelector('ion-menu')?.open();
  }
}

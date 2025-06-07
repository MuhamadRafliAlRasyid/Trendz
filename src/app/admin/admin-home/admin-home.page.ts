import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AdminHomePage implements OnInit {
  totalProducts: number = 0;
  totalOrders: number = 0;
  totalUsers: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.fetchDashboardData();
    this.initSalesChart();
  }

  fetchDashboardData() {
    // Mengambil data untuk produk, transaksi, dan pengguna dari API
    this.http.get<any>('http://localhost/api/dashboard').subscribe(data => {
      this.totalProducts = data.totalProducts;
      this.totalOrders = data.totalOrders;
      this.totalUsers = data.totalUsers;
    });
  }

  initSalesChart() {
    // Data untuk grafik penjualan
    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 9],  // Data penjualan untuk setiap bulan
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
            display: false  // Tidak menampilkan legend
          }
        },
        scales: {
          y: {
            beginAtZero: true  // Mulai sumbu Y dari 0
          }
        }
      }
    });
  }

  openMenu() {
    document.querySelector('ion-menu')?.open();  // Membuka sidebar menu
  }
}

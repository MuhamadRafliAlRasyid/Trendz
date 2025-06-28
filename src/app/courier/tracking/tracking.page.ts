import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
  standalone: true,
  imports: [ IonicModule,
    CommonModule,
    FormsModule]
})
export class TrackingPage implements OnInit {
  map: any;
  orderId: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.queryParamMap.get('order_id') || '';
    this.loadMap();
    this.fetchCourierLocation();
  }

  loadMap() {
    this.map = L.map('map').setView([-6.2, 106.8], 13); // default ke Jakarta

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  fetchCourierLocation() {
    this.http.get<any>(`http://localhost:8000/api/courier/location/${this.orderId}`).subscribe({
  next: (res) => {
    if (res?.lat && res?.lng) {
      const marker = L.marker([res.lat, res.lng]).addTo(this.map);
      marker.bindPopup('Kurir saat ini').openPopup();
      this.map.setView([res.lat, res.lng], 15);
    } else {
      alert('Lokasi kurir tidak ditemukan.');
    }
  },
  error: (err) => {
    console.error(err);
    alert('Gagal mendapatkan lokasi kurir.');
  }
});

  }
}

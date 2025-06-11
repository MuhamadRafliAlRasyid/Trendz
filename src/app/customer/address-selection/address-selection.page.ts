import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';  // Keep the main Ionic import

@Component({
  selector: 'app-address-selection',
  templateUrl: './address-selection.page.html',
  styleUrls: ['./address-selection.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]  // Removed standalone Ionic components imports
})
export class AddressSelectionPage implements OnInit {
  userId: number = 1; // Get this from Auth service ideally
  addresses: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadUserAddresses();
  }

  loadUserAddresses() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any[]>(`http://localhost:8000/api/addresses`, { headers }).subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Failed to fetch user addresses', error);
      }
    );
  }

  selectAddress(address: any) {
  // Navigate back to CheckoutPage with the selected address as a query parameter
  this.router.navigate(['/checkout'], {
    queryParams: { selectedAddress: JSON.stringify(address) },
  });
}
navigateToAddAddress() {
    this.router.navigate(['/address-form']);
  }
}

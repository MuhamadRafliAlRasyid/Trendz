// src/app/services/shipping.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get(`${this.apiUrl}/cities`);
  }

  getCost(data: { origin: string; destination: string; weight: number; courier: string }) {
    return this.http.post(`${this.apiUrl}/cost`, data);
  }

  getShippingOptions(data: { destination: string; courier: string }) {
    return this.http.post(`${this.apiUrl}/shipping/options`, data);
  }

  saveDelivery(data: any) {
    return this.http.post(`${this.apiUrl}/delivery`, data);
  }
}

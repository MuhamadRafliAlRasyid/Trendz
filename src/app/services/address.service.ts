import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = 'http://localhost:8000/api/addresses'; // API Laravel

  constructor(private http: HttpClient) {}

  // Ambil semua alamat pengguna
  getAddresses(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Menambahkan alamat baru
  addAddress(addressData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.apiUrl, addressData, { headers });
  }

  // Mengambil alamat berdasarkan ID
  getAddressById(addressId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/${addressId}`, { headers });
  }

  // Memperbarui alamat
  updateAddress(addressId: number, addressData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(`${this.apiUrl}/${addressId}`, addressData, { headers });
  }

  // Menghapus alamat
  deleteAddress(addressId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}/${addressId}`, { headers });
  }
}

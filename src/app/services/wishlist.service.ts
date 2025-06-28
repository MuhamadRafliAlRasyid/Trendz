import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
  is_wishlist: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private apiUrl = 'http://localhost:8000/api/wishlist';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Auth Token:', token);
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  // Ambil semua wishlist user
  getWishlist(userId: number): Observable<WishlistItem[]> {
  return this.http.get<WishlistItem[]>(`${this.apiUrl}?user_id=${userId}`, {
    headers: this.getAuthHeaders(),
  });
}


  // Tambahkan produk ke wishlist
  addToWishlist(product_id: number): Observable<any> {
    return this.http.post(
      this.apiUrl,
      { product_id },
      { headers: this.getAuthHeaders() }
    );
  }

  // Hapus produk dari wishlist
  removeWishlistItem(product_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${product_id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

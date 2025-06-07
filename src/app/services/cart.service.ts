import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:8000/api/cart';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Auth Token:', token); // Debug token
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  addCartItem(data: {
    user_id: number;
    product_id: number;
    quantity: number;
  }): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCartItem(cartItemId: number, quantity: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${cartItemId}`,
      { quantity },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartItemId}`, {
      headers: this.getAuthHeaders(),
    });
  }
}

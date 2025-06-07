import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<Product[]>(this.apiUrl, { headers });
  }
}

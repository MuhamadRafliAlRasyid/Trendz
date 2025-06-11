import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  // Replace with the URL of your Laravel API
  private apiUrl = 'http://localhost:8000/api/transactions';


  constructor(private http: HttpClient) {}

  // Function to get all transactions
  getTransactions(status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
    return this.http.get(this.apiUrl, { params, headers: this.getAuthHeaders() });
  }

  // Function to get transaction details by ID
  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Function to create a new transaction
  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(this.apiUrl, transactionData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Function to update transaction status
  updateTransactionStatus(id: number, statusData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, statusData, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  // Function to get categorized transactions
  getStatusTransactions(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return throwError('No token found in localStorage');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/status`, { headers });  // Updated to '/status'
  }

  // Private method to get auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Auth Token:', token); // Debug token
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  // Error handling method for HTTP requests
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

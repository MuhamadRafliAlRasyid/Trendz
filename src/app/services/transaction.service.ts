import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  getTransactions(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Function to get transaction details by ID
  getTransactionById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Function to create a new transaction
  createTransaction(transactionData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Handle case where token is not available
    if (!token) {
      console.error('No token found in localStorage');
      return throwError('No token found in localStorage'); // Return an observable with an error
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Include the token in the header
    });

    return this.http.post(this.apiUrl, transactionData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Function to update transaction status
  updateTransactionStatus(id: number, statusData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, statusData).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling method for HTTP requests
  private handleError(error: any): Observable<never> {
    // Log error to console or perform any other error handling here
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

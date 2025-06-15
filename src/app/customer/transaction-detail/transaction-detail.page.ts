import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare global {
  interface Window {
    snap: any;
  }
}

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.page.html',
  styleUrls: ['./transaction-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TransactionDetailPage implements OnInit {
  transactionId: string | null = null;
  transaction: any = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.transactionId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Transaction ID:', this.transactionId);

    this.loadTransaction();

    this.loadSnapScript().catch((error) => {
      console.error(error);
    });
  }

  loadTransaction() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(`http://localhost:8000/api/transactions/${this.transactionId}`, { headers })
      .subscribe({
        next: (data) => {
          this.transaction = data;
        },
        error: (err) => {
          console.error('Gagal mengambil data transaksi', err);
        },
      });
  }

  async bayarSekarang() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      await this.waitForSnap();

      this.http
        .post<any>(
          `http://localhost:8000/api/midtrans/token/${this.transactionId}`,
          { transaction_id: this.transactionId },
          { headers }
        )
        .subscribe({
          next: (response) => {
            const snapToken = response.snap_token;

            window.snap.pay(snapToken, {
              onSuccess: (result: any) => {
                console.log('Payment Success:', result);
                this.router.navigate(['/transaction-success']);
              },
              onPending: (result: any) => {
                console.log('Payment Pending:', result);
                this.router.navigate(['/transaction-pending']);
              },
              onError: (error: any) => {
                console.error('Payment Failed:', error);
                alert('Pembayaran gagal. Silakan coba lagi.');
              },
              onClose: () => {
                console.log('Popup pembayaran ditutup.');
              },
            });
          },
          error: (err) => {
            console.error('Gagal mendapatkan snap token:', err);
            alert('Gagal memulai pembayaran.');
          },
        });
    } catch (e) {
      console.error(e);
      alert('Midtrans Snap gagal dimuat. Silakan refresh halaman.');
    }
  }

  async waitForSnap(): Promise<void> {
    let tries = 0;
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (window.snap) {
          clearInterval(interval);
          resolve();
        } else {
          tries++;
          if (tries > 20) {
            clearInterval(interval);
            reject('Midtrans Snap belum siap.');
          }
        }
      }, 200);
    });
  }

  loadSnapScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('midtrans-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'midtrans-script';
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key', 'SB-Mid-client-KL-gJ5f8INuHbzbS');
      script.onload = () => {
        console.log('Snap.js loaded');
        resolve();
      };
      script.onerror = () => {
        reject('Gagal memuat Midtrans Snap.js');
      };

      document.body.appendChild(script);
    });
  }
}

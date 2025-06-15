import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

declare global {
  interface Window {
    snap: any;
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PaymentPage implements OnInit {
  userId: number = 1; // Ganti dengan userId dari AuthService jika sudah ada
  cart: any[] = [];
  address: any = {};
  totalPrice: number = 0;
  shipping: number = 10000;
  serviceFee: number = 2500;
  transactionId: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  async ngOnInit() {
  this.transactionId = this.activatedRoute.snapshot.paramMap.get('id');
  console.log('Transaction ID:', this.transactionId);
  try {
    await this.loadSnapScript();
  } catch (error) {
    console.error('Snap.js gagal dimuat:', error);
  }
  this.payWithMidtrans();
  this.loadUserAddress();
  this.loadCartItems();
}


  loadUserAddress() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(`http://localhost:8000/api/addresses/${this.userId}`, { headers }).subscribe(
      (data) => {
        this.address = data;
      },
      (error) => {
        console.error('Failed to fetch user address', error);
      }
    );

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['selectedAddress']) {
        try {
          this.address = JSON.parse(params['selectedAddress']);
        } catch (error) {
          console.error('Error parsing selected address:', error);
        }
      }
    });
  }

  loadCartItems() {
    this.cartService.getCartItems(this.userId).subscribe(
      (data) => {
        this.cart = data;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to fetch cart items', error);
      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }

  get subtotal() {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get total() {
    return this.subtotal + this.shipping + this.serviceFee;
  }

  changeAddress() {
    this.router.navigate(['/address-selection']);
  }

  async payWithMidtrans() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      await this.waitForSnap();

   this.http
  .post<any>(
    'http://localhost:8000/api/midtrans/token/' + this.transactionId,
    { transaction_id: this.transactionId }, // <-- kirim di body
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
      console.error('Error getting snap token:', err);
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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

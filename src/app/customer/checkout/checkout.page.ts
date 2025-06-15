import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CheckoutPage implements OnInit {
  userId: number = 1;
  cart: any[] = [];
  address: any = null;
  totalPrice: number = 0;
  shipping = 10000;
  serviceFee = 1000;

  constructor(
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private transactionService: TransactionService,
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadUserAddress();
    this.loadCartItems();
  }

  loadUserData() {
    const user = this.authService.getUser();
    if (user) {
      this.userId = user.id;
    } else {
      console.error('User not logged in');
    }
  }

  loadUserAddress() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['selectedAddress']) {
        try {
          this.address = JSON.parse(params['selectedAddress']);
        } catch (error) {
          console.error('Error parsing selected address:', error);
        }
      }

      // Jika belum ada address dari query, ambil default dari API
      if (!this.address) {
        this.http.get<any>('http://localhost:8000/api/addresses/default', { headers }).subscribe({
          next: (data) => {
            this.address = data;
            if (!this.address || Object.keys(this.address).length === 0) {
              this.showAddressAlert();
            }
          },
          error: (error) => {
            console.error('Failed to fetch default address', error);
            this.showAddressAlert();
          }
        });
      }
    });
  }

  async showAddressAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alamat Diperlukan',
      message: 'Anda belum mengisi alamat pengiriman. Silakan isi terlebih dahulu.',
      buttons: [
        {
          text: 'Isi Sekarang',
          handler: () => {
            this.router.navigate(['/address-selection']);
          }
        }
      ],
      backdropDismiss: false
    });
    await alert.present();
  }

  loadCartItems() {
    this.cartService.getCartItems(this.userId).subscribe({
      next: (data) => {
        this.cart = data;
        this.calculateTotalPrice();
      },
      error: (error) => {
        console.error('Failed to fetch cart items', error);
      }
    });
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
    this.router.navigate(['/address-selection'], {
      queryParams: { selectedAddress: JSON.stringify(this.address) }
    });
  }

  async placeOrder() {
  if (!this.address || !this.address.id) {
    await this.showAddressAlert();
    return;
  }

  const transaction = {
    user_id: this.userId,
    address_id: this.address.id,
    total_price: this.total,
    status: 'pending',
    products: this.cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      price_per_item: item.product.price
    }))
  };

  this.transactionService.createTransaction(transaction).subscribe({
    next: (response) => {
      console.log('Transaction placed successfully:', response);
      alert('Order placed successfully!');
      this.removeCartItems();

      const transactionId = response.transaction?.id;

      if (transactionId) {
        this.router.navigate(['/payment', transactionId]);
      } else {
        console.error('Transaction ID is undefined in response:', response);
        alert('Gagal mendapatkan ID transaksi. Silakan coba lagi.');
      }
    },
    error: (error) => {
      console.error('Error placing order:', error);
      alert('Terjadi kesalahan saat memproses pesanan.');
    }
  });
}


  removeCartItems() {
    this.cart.forEach((item) => {
      this.cartService.deleteCartItem(item.id).subscribe({
        next: () => {
          console.log(`Item ${item.product.name} removed.`);
        },
        error: (error) => {
          console.error(`Gagal menghapus item ${item.product.name}`, error);
        }
      });
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}

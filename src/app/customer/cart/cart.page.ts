import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CartPage implements OnInit {
  selectedTab = 'cart';
  cart: any[] = [];
  wishlist: any[] = [];
  totalPrice: number = 0;
  userId: number = 1;



  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }



  loadCartItems() {
    this.cartService.getCartItems(this.userId).subscribe(
      (data) => {
        console.log('Cart Items:', data);
        this.cart = data;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to fetch cart items', error);
      }
    );
  }
  getProductImage(item: any): string {
    const imageName = item.product?.image;
    if (!imageName) return 'assets/default.jpg';
    return `http://localhost:8000/storage/products/${imageName}`;
  }
  onImageError(event: any) {
  event.target.src = 'assets/default.jpg';
}



  loadWishlist() {
    this.http.get<any[]>('http://localhost:8000/api/wishlist').subscribe(
      (data) => {
        this.wishlist = data;
      },
      (error) => {
        console.error('Failed to fetch wishlist items', error);
      }
    );
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }

  addToCart(product: any) {
    const data = {
      user_id: this.userId,
      product_id: product.id,
      quantity: 1
    };
    this.cartService.addCartItem(data).subscribe(
      () => this.loadCartItems(),
      (err) => console.error('Failed to add item', err)
    );
  }

  removeFromCart(item: any) {
    this.cartService.deleteCartItem(item.id).subscribe(
      () => {
        this.cart = this.cart.filter(c => c.id !== item.id);
        this.calculateTotalPrice();
      },
      (err) => console.error('Failed to remove item', err)
    );
  }

  updateQuantity(item: any, newQty: number) {
    if (newQty < 1) return;
    this.cartService.updateCartItem(item.id, newQty).subscribe(
      () => {
        item.quantity = newQty;
        this.calculateTotalPrice();
      },
      (err) => console.error('Failed to update quantity', err)
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onSegmentChanged(event: any) {
    this.selectedTab = event.detail.value;
  }

  addToWishlist(item: any) {
    console.log('Tambah ke wishlist:', item);
  }

  viewProduct(id: string) {
    console.log('Lihat produk:', id);
  }
}

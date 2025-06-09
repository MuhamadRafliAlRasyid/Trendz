import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [ IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule]
})
export class CheckoutPage implements OnInit {
  userId: number = 1; // Ideally, you would get this from Auth service
  cart: any[] = [];
  address: any = {};
  totalPrice: number = 0;
  shipping = 10000;
  serviceFee = 2500;

  constructor(private router: Router, private http: HttpClient,  private activatedRoute: ActivatedRoute,private cartService: CartService,private transactionService: TransactionService) {}

  ngOnInit() {
    // Get the selected address from the URL params
    this.loadUserAddress()
    // Load the cart items
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems(this.userId).subscribe(
      (data) => {
        this.cart = data; // Store cart items here
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Failed to fetch cart items', error);
      }
    );
  }changeAddress() {
    // Navigate to the address selection page to choose a new address
    this.router.navigate(['/address-selection']);
  }

  loadUserAddress() {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(`http://localhost:8000/api/addresses/${this.userId}`, { headers }).subscribe(
      (data) => {
        this.address = data; // Set address fetched from API if not passed from address selection
      },
      (error) => {
        console.error('Failed to fetch user address', error);
      }
    );
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params && params['selectedAddress']) {  // Updated with bracket notation
        try {
          // Parse the selected address from the query parameter
          this.address = JSON.parse(params['selectedAddress']);  // Updated with bracket notation
        } catch (error) {
          console.error('Error parsing selected address:', error);
        }
      }
    });
  }

  get subtotal() {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  get total() {
    return this.subtotal + this.shipping + this.serviceFee;
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);
  }

  removeCartItems() {
    this.cart.forEach((item) => {
      this.cartService.deleteCartItem(item.id).subscribe(
        () => {
          console.log(`Item ${item.product.name} removed successfully.`);
        },
        (error) => {
          console.error(`Failed to remove item ${item.product.name}`, error);
        }
      );
    });
  }

   placeOrder() {
    this.removeCartItems()
    const transaction = {
      user_id: this.userId,
      address_id: this.address.id,
      total_price: this.total,
      status: 'pending',
      products: this.cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price_per_item: item.product.price,
      })),
    };

    // Call the service to create the transaction
    this.transactionService.createTransaction(transaction).subscribe(
      (response) => {
        console.log('Transaction placed successfully:', response);
        alert('Order placed successfully!');
        // Optionally, navigate to the order confirmation page
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error placing order:', error);
        alert('There was an error placing your order.');
      }
    );
  }



  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}


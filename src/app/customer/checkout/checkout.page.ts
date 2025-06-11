import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
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

  constructor(private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private transactionService: TransactionService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Get the selected address from the URL params
    this.loadUserAddress()
    // Load the cart items
    this.loadCartItems();
     this.loadUserData();
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
  // When navigating to the address selection page, pass the current address as a parameter
  this.router.navigate(['/address-selection'], {
    queryParams: { selectedAddress: JSON.stringify(this.address) },
  });
}
loadUserData() {
    const user = this.authService.getUser();  // Get user from AuthService
    if (user) {
      this.userId = user.id;  // Assign the userId dynamically from the AuthService
    } else {
      console.error('User not logged in');
    }
  }

  loadUserAddress() {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  // Check for query parameters passed to the page
  this.activatedRoute.queryParams.subscribe((params) => {
    if (params && params['selectedAddress']) {
      try {
        // Parse the selected address from the query parameter
        this.address = JSON.parse(params['selectedAddress']);
      } catch (error) {
        console.error('Error parsing selected address:', error);
      }
    } else {
      // If no selected address passed, fetch the default address
      this.http.get<any>(`http://localhost:8000/api/addresses/${this.userId}`, { headers }).subscribe(
        (data) => {
          this.address = data; // Set address fetched from API if not passed from address selection
        },
        (error) => {
          console.error('Failed to fetch user address', error);
        }
      );
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


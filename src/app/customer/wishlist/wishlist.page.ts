import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WishlistService, WishlistItem } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class WishlistPage implements OnInit {
  wishlistItems: WishlistItem[] = [];
  baseImageUrl: string = 'http://localhost:8000/storage/products/';

  constructor(
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
  const user = this.authService.getUser();
  const userId = user?.id;

  if (!userId) {
    console.error('User ID not found');
    return;
  }

  this.wishlistService.getWishlist(userId).subscribe({
    next: (items: WishlistItem[]) => {
      this.wishlistItems = items.map((item: WishlistItem) => ({
        ...item,
        product: {
          ...item.product,
          iimage: item.product.image || 'assets/default.jpg',
        },
      }));
    },
    error: (err: any) => {
      console.error('Error loading wishlist', err);
    },
  });
}


  removeFromWishlist(id: number): void {
    this.wishlistService.removeWishlistItem(id).subscribe({
      next: () => this.loadWishlist(),
      error: (err: any) => {
        console.error('Error removing item', err);
      },
    });
  }

  viewProduct(id: number): void {
    this.router.navigate(['/product-detail', id]);
  }

  onImageError(event: any): void {
    event.target.src = '';
  }


}

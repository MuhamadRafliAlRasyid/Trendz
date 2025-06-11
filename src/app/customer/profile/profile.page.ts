import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ProfilePage implements OnInit {
  user: any = {};
  categorizedTransactions: any = {
    pending: [],
    paid: [],
    processed: [],
    shipped: [],
    delivered: [],
  };

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService,
    private router: Router,
    private http: HttpClient // ✅ tambahkan ini
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.getTransactionStatus();
  }

  loadUserData() {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  this.http.get('http://localhost:8000/api/profile', { headers }).subscribe(
    (response: any) => {
      this.user = response.data;
      console.log('User dari API profile:', this.user);

      // Cek apakah ada gambar di path tertentu
      if (this.user.profile_picture && !this.user.profile_picture.includes('default-avatar.png')) {
        // Jika API sudah mengembalikan full URL (http://...), langsung pakai
        this.user.profile_picture = this.user.profile_picture.startsWith('http')
          ? this.user.profile_picture
          : `http://localhost:8000/storage/${this.user.profile_picture}`;
      } else {
        // fallback default
        this.user.profile_picture = 'assets/img/default-avatar.png';
      }
    },
    (error) => {
      console.error('Gagal ambil profil:', error);
    }
  );
}

  changePassword() {
    this.router.navigate(['/account-settings']);
  }

  getTransactionStatus() {
    this.transactionService.getStatusTransactions().subscribe(
      (data: any) => {
        this.categorizedTransactions = data;
        console.log('Categorized Transactions:', data);
      },
      (error) => {
        console.error('Failed to load transactions:', error);
      }
    );
  }
}

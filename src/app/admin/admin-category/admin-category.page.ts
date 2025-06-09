import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.page.html',
  styleUrls: ['./admin-category.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonicModule,]
})
export class AdminCategoryPage implements OnInit {
  categories: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    });

    this.http.get<any[]>('http://localhost:8000/api/admin/categories', { headers })
      .subscribe({
        next: (data) => this.categories = data,
        error: (err) => console.error('Gagal ambil kategori:', err)
      });
  }

  editCategory(id: number) {
    this.router.navigate(['/admin-category-edit', id]);
  }

  deleteCategory(id: number) {
    // Implementasi hapus (gunakan alert + HTTP DELETE)
  }
}

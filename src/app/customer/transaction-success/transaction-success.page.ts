import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-transaction-success',
  templateUrl: './transaction-success.page.html',
  styleUrls: ['./transaction-success.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonicModule]
})
export class TransactionSuccessPage implements OnInit {
  transaction: any = {
    order_id: '',
    status: '',
    date: '',
    items: [],
    total: 0
  };

  constructor(
    private toastCtrl: ToastController,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      const orderId = params['order_id'];
      if (orderId) {
        this.loadTransaction(orderId);
      }
    });
  }

  loadTransaction(orderId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(`http://localhost:8000/api/transactions/order/${orderId}`, { headers }).subscribe({
      next: (data) => {
        console.log('Transaction success data:', data);
        this.transaction = {
          ...data,
          date: new Date(data.created_at).toLocaleString(),
          items: data.details || [],
          total: data.total_price || 0,
        };
      },
      error: (err) => {
        console.error('Failed to load transaction:', err);
      }
    });
  }

  async generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Struk Pembayaran - TrendZ', 14, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${this.transaction.order_id}`, 14, 30);
    doc.text(`Tanggal: ${this.transaction.date}`, 14, 36);
    doc.text(`Status: ${this.transaction.status}`, 14, 42);

    autoTable(doc, {
      head: [['Produk', 'Jumlah', 'Harga']],
      body: this.transaction.items.map((item: any) => [
        item.product_name || item.name,
        item.qty || item.quantity || 1,
        `Rp ${item.price?.toLocaleString() || 0}`
      ]),
      startY: 50
    });

    const finalY = (doc as any).lastAutoTable.finalY;
    doc.text(`Total: Rp ${this.transaction.total.toLocaleString()}`, 14, finalY + 10);

    doc.save(`struk-${this.transaction.order_id}.pdf`);

    const toast = await this.toastCtrl.create({
      message: 'Struk berhasil diunduh!',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}

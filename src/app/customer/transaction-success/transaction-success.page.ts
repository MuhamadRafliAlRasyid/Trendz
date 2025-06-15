import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-transaction-success',
  templateUrl: './transaction-success.page.html',
  styleUrls: ['./transaction-success.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule , IonicModule]
})
export class TransactionSuccessPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet]
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkPaymentCallback();
    });
  }

  checkPaymentCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const statusCode = urlParams.get('status_code');
    const transactionStatus = urlParams.get('transaction_status');

    if (statusCode === '200' && transactionStatus === 'settlement') {
      // Redirect ke halaman transaksi sukses
      this.router.navigate(['/transaction-success']);
    }
  }
}

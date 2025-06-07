import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-complete',
  templateUrl: './splash-complete.page.html',
  styleUrls: ['./splash-complete.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SplashCompletePage {
  username = '';
  email = '';
  password = '';
  acceptedTerms = false;

  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

}

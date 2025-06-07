import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-restore',
  templateUrl: './splash-restore.page.html',
  styleUrls: ['./splash-restore.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SplashRestorePage {
  username = '';
  email = '';
  password = '';
  acceptedTerms = false;

  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  }

}

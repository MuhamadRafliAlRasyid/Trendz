import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CompleteProfilePage {
  username = '';
  email = '';
  password = '';
  acceptedTerms = false;

  constructor(private router: Router) {}

  onCompleteProfile() {
    this.router.navigate(['/splash-complete']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}


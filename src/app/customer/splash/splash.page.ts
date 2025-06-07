import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // ✅ WAJIB
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true, // ✅ karena ini Standalone
  imports: [IonicModule], // ✅ agar <ion-*> dikenali
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/signup');
    }, 1000);
  }

}


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; // Tambahkan ini
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule, // Tambahkan ini ke array imports
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

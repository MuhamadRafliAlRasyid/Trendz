import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// ✅ Tambahkan ini
import { StoreModule } from '@ngrx/store';
import { shippingReducer } from './store/shipping/shipping.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    // ✅ Pastikan StoreModule di-import dengan reducer
    StoreModule.forRoot({ shipping: shippingReducer }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

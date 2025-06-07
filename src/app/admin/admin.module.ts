import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AdminRoutingModule } from './admin-routing.module'; // Import routing untuk Admin
import { AdminHomePage } from './admin-home/admin-home.page'; // Admin Dashboard
import { LoginAdminPage } from './login-admin/login-admin.page';  // Admin Login
import { RegisterAdminPage } from './register-admin/register-admin.page'; // Admin Register
// import { ProductManagementPage } from './product-management/product-management.page'; // Manajemen Produk
// import { TransactionManagementPage } from './transaction-management/transaction-management.page'; // Manajemen Transaksi
// import { SalesReportPage } from './sales-report/sales-report.page'; // Laporan Penjualan
// import { UserManagementPage } from './user-management/user-management.page'; // Manajemen Pengguna

@NgModule({
  declarations: [
    AdminHomePage,
    LoginAdminPage,
    RegisterAdminPage,
    // ProductManagementPage,
    // TransactionManagementPage,
    // SalesReportPage,
    // UserManagementPage
  ],
  imports: [
   CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}

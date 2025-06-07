import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomePage } from './admin-home/admin-home.page';
import { LoginAdminPage } from './login-admin/login-admin.page';
import { RegisterAdminPage } from './register-admin/register-admin.page';
// import { ProductManagementPage } from './product-management/product-management.page';
// import { TransactionManagementPage } from './transaction-management/transaction-management.page';
// import { SalesReportPage } from './sales-report/sales-report.page';
// import { UserManagementPage } from './user-management/user-management.page';

const routes: Routes = [
  { path: 'admin-home', component: AdminHomePage },
  { path: 'admin-login', component: LoginAdminPage },
  { path: 'admin-register', component: RegisterAdminPage },
  // { path: 'product-management', component: ProductManagementPage },
  // { path: 'transaction-management', component: TransactionManagementPage },
  // { path: 'sales-report', component: SalesReportPage },
  // { path: 'user-management', component: UserManagementPage },
  { path: '', redirectTo: 'admin-login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

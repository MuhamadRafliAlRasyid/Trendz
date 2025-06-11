import { Routes } from '@angular/router';

export const routes: Routes = [
  // Admin routes
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin/admin-home/admin-home.page').then(m => m.AdminHomePage),
  },
  {
    path: 'admin/register',
    loadComponent: () => import('./admin/register-admin/register-admin.page').then(m => m.RegisterAdminPage),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login-admin/login-admin.page').then(m => m.LoginAdminPage),
  },
  {
  path: 'admin-category',
  loadComponent: () => import('./admin/admin-category/admin-category.page').then(m => m.AdminCategoryPage),
},
{
  path: 'admin-product',
  loadComponent: () => import('./admin/admin-product/admin-product.page').then(m => m.AdminProductPage)
},



  // Admin management routes
  {
    path: 'product-management',
    loadComponent: () => import('./admin/product-management/product-management.page').then(m => m.ProductManagementPage),
  },
  {
    path: 'transaction-management',
    loadComponent: () => import('./admin/transaction-management/transaction-management.page').then(m => m.TransactionManagementPage),
  },
  {
    path: 'sales-report',
    loadComponent: () => import('./admin/sales-report/sales-report.page').then(m => m.SalesReportPage),
  },
  {
    path: 'user-management',
    loadComponent: () => import('./admin/user-management/user-management.page').then(m => m.UserManagementPage),
  },

  // Product details page (moved from duplicate routes)
  {
    path: 'product-detail',
    loadComponent: () => import('./customer/product-detail/product-detail.page').then(m => m.ProductDetailPage),
  },

  // Customer routes
  {
    path: 'home',
    loadComponent: () => import('./customer/home/home.page').then(m => m.HomePage),
  },
  {
    path: '',
    loadComponent: () => import('./customer/splash/splash.page').then(m => m.SplashPage),
  },
  {
    path: 'address-form',
    loadComponent: () => import('./customer/address-form/address-form.page').then(m => m.AddressFormPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./customer/cart/cart.page').then(m => m.CartPage),
  },
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./customer/product-detail/product-detail.page').then(m => m.ProductDetailPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./customer/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./customer/signup/signup.page').then(m => m.SignupPage),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./customer/forgot-password/forgot-password.page').then(m => m.ForgotPasswordPage),
  },
  {
    path: 'new-password',
    loadComponent: () => import('./customer/new-password/new-password.page').then(m => m.NewPasswordPage),
  },
  {
    path: 'splash-restore',
    loadComponent: () => import('./customer/splash-restore/splash-restore.page').then(m => m.SplashRestorePage),
  },
  {
    path: 'splash-complete',
    loadComponent: () => import('./customer/splash-complete/splash-complete.page').then(m => m.SplashCompletePage),
  },
  {
    path: 'verify',
    loadComponent: () => import('./customer/verify/verify.page').then(m => m.VerifyPage),
  },
  {
    path: 'complete-profile',
    loadComponent: () => import('./customer/complete-profile/complete-profile.page').then(m => m.CompleteProfilePage),
  },
  {
    path: 'payment',
    loadComponent: () => import('./payment/payment.page').then(m => m.PaymentPage),
  },
  {
  path: 'address-selection',
  loadComponent: () =>
    import('./customer/address-selection/address-selection.page').then(
      (m) => m.AddressSelectionPage
    ),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./customer/checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./customer/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'account-settings',
    loadComponent: () => import('./customer/account-settings/account-settings.page').then( m => m.AccountSettingsPage)
  },
];

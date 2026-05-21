import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NoneFotterLayoutComponent } from './layouts/none-fotter-layout/none-fotter-layout.component';
import { NavbarNoneCategoryLayoutComponent } from './layouts/navbar-none-category-layout/navbar-none-category-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // ------------------------------------------
  // MAIN LAYOUT (Ana Sayfa ve İçerikler)
  // ------------------------------------------


  // ------------------------------------------
  // AUTH LAYOUT (Giriş, Kayıt, Checkout)
  // ------------------------------------------
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'YunusPet' },
      { 
        path: 'home', 
        redirectTo: '', 
        pathMatch: 'full' 
      },
      { 
        path: 'anasayfa', 
        redirectTo: '', 
        pathMatch: 'full' 
      },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Giriş Yap' },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Kayıt Ol' },
      { path: 'sifremi-unuttum', loadComponent: () => import('./pages/forgotPassword/forgot-main/forgot-main.component').then(m => m.ForgotMainComponent), title: 'Şifremi Unuttum' },
      { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard], title: 'Checkout' },
      { path: 'payment/result', loadComponent: () => import('./pages/payment-result/payment-result.component').then(m => m.PaymentResultComponent), title: 'Ödeme Sonucu' },
    ]
  },

  // ------------------------------------------
  // NONE FOOTER LAYOUT (Hesabım ve İzinler)
  // ------------------------------------------
  
  {
    path: '',
    component: NoneFotterLayoutComponent,
    children: [
      {
        path: 'hesabim',
        loadComponent: () => import('./pages/dashboard/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        title: 'Hesabım',
        children: [
          { path: 'adreslerim', loadComponent: () => import('./pages/dashboard/dashboard-address/dashboard-address.component').then(m => m.DashboardAddressComponent), title: 'Adreslerim' },
          { path: 'siparislerim', loadComponent: () => import('./pages/dashboard/dashboard-orders/dashboard-orders.component').then(m => m.DashboardOrdersComponent), title: 'Siparişlerim' },
          { path: 'siparislerim/:id', loadComponent: () => import('./pages/order-detail/order-detail.component').then(m => m.OrderDetailComponent), title: 'Siparişim' },
          { path: 'siparislerim/iade/:id', loadComponent: () => import('./pages/order-refund/order-refund.component').then(m => m.OrderRefundComponent), title: 'İade' },
          { path: 'yorumlarim', loadComponent: () => import('./pages/dashboard/dashboard-reviews/dashboard-reviews.component').then(m => m.DashboardReviewsComponent), title: 'Yorumlarım' },
          { path: 'kullanici-bilgilerim', loadComponent: () => import('./pages/dashboard/profile/user-info/user-info.component').then(m => m.UserInfoComponent), title: 'Kullanıcı Bilgilerim' },
          { path: 'sifre-degistir', loadComponent: () => import('./pages/dashboard/profile/change-password/change-password.component').then(m => m.ChangePasswordComponent), title: 'Şifre Değiştir' },
          { path: 'kayitli-kartlarim', loadComponent: () => import('./pages/dashboard/saved-card/saved-card.component').then(m => m.SavedCardComponent), title: 'Kayıtlı Kartlarım' },
        ]
      },
      {
        path: 'izinler',
        loadComponent: () => import('./staticPages/permissions/permissions.component').then(m => m.PermissionsComponent),
        title: 'İzinler',
        children: [
          { path: 'kvkk', loadComponent: () => import('./staticPages/permissions/kvkk-permission/kvkk-permission.component').then(m => m.KvkkPermissionComponent), title: 'KVKK' },
          { path: 'uyelik-sozlesmesi', loadComponent: () => import('./staticPages/permissions/membership-permission/membership-permission.component').then(m => m.MembershipPermissionComponent), title: 'Üyelik Sözleşmesi' },
          { path: 'mesafeli-satis-sozlesmesi', loadComponent: () => import('./staticPages/permissions/distance-sales-permission/distance-sales-permission.component').then(m => m.DistanceSalesPermissionComponent), title: 'Mesafeli Satış Sözleşmesi' },
          { path: 'on-bilgilendirme-formu', loadComponent: () => import('./staticPages/permissions/pre-info-permission/pre-info-permission.component').then(m => m.PreInfoPermissionComponent), title: 'Ön Bilgilendirme Formu' },
          { path: 'gizlilik-politikasi', loadComponent: () => import('./staticPages/permissions/privacy-policy-permission/privacy-policy-permission.component').then(m => m.PrivacyPolicyPermissionComponent), title: 'Gizlilik Politikası' },
          { path: 'cerez-politikasi', loadComponent: () => import('./staticPages/permissions/cookie-policy-permission/cookie-policy-permission.component').then(m => m.CookiePolicyPermissionComponent), title: 'Çerez Politikası' },
        ]
      },
      {
        path: 'yardim',
        loadComponent: () => import('./pages/help-center/help-center.component').then(m => m.HelpCenterComponent),
        title: 'İletişim',
        children: [
          { path: 'destek', loadComponent: () => import('./pages/support-request/support-request.component').then(m => m.SupportRequestComponent), title: 'Destek' },
          { path: 'teslimat-kosullari', loadComponent: () => import('./pages/help-center/delivery-policy/delivery-policy.component').then(m => m.DeliveryPolicyComponent), title: 'Teslimat Koşulları' },
          { path: 'iade-sureci', loadComponent: () => import('./pages/help-center/refund-policy/refund-policy.component').then(m => m.RefundPolicyComponent), title: 'İade ve Garanti' },
          { path: 'iletisim', loadComponent: () => import('./pages/help-center/contact/contact.component').then(m => m.ContactComponent), title: 'İletişim' },
        
        ]
      }
    ]
  },

  // ------------------------------------------
  // NAVBAR NONE CATEGORY LAYOUT (Sepet vs.)
  // ------------------------------------------
  {
    path: '',
    component: NavbarNoneCategoryLayoutComponent,
    children: [
      { path: 'cart', loadComponent: () => import('./pages/cart-page/cart-page.component').then(m => m.CartPageComponent), canActivate: [authGuard], title: 'Sepet' },
    ]
  },


  {
    path: '',
    component: MainLayoutComponent,
    children: [

      { path: 'ara', loadComponent: () => import('./pages/category-page/category-page.component').then(m => m.CategoryPageComponent), data: { mode: 'search' }, title: 'Arama' },
      { path: 'kategori/:slug', loadComponent: () => import('./pages/category-page/category-page.component').then(m => m.CategoryPageComponent), data: { mode: 'category' }, },

      { path: 'hakkimizda', loadComponent: () => import('./staticPages/about-us/about-us.component').then(m => m.AboutUsComponent), title: 'Biz kimiz?' },

      { path: 'kampanya/:slug', loadComponent: () => import('./pages/campaign-page/campaign-page.component').then(m => m.CampaignPageComponent), title: 'Kampanya' },

      { path: ':slug/yorumlar', loadComponent: () => import('./pages/review-page/review-page.component').then(m => m.ReviewPageComponent), title: 'Yorumlar' },
      { path: ':slug', loadComponent: () => import('./pages/advert-item-page/advert-item-page.component').then(m => m.EachItemPageComponent)},


    ]
  },

  // ------------------------------------------
  // DYNAMIC ROUTES (Kategori & Arama)
  // Not: Bunlar en altta olmalı ki üsttekileri ezmesin
  // ------------------------------------------



  // ------------------------------------------
  // WILDCARD ROUTE (Bulunamayan Sayfalar İçin)
  // ------------------------------------------
  { path: '**', redirectTo: '' }
];
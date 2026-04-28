import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { EachItemPageComponent } from './each-item-page/each-item-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CampaignPageComponent } from './campaign-page/campaign-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ForgotMainComponent } from './auth/forgotPassword/forgot-main/forgot-main.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from './shared/address/address/address.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PaymentResultComponent } from './payment/payment-result/payment-result.component';
import { DashboardAddressComponent } from './dashboard/dashboard-address/dashboard-address.component';
import { NoneFotterLayoutComponent } from './layouts/none-fotter-layout/none-fotter-layout.component';
import { DashboardOrdersComponent } from './dashboard/dashboard-orders/dashboard-orders.component';
import { OrderDetailComponent } from './orders/order-detail/order-detail.component';
import { OrderRefundComponent } from './orders/order-refund/order-refund.component';
import { DashboardReviewsComponent } from './dashboard/dashboard-reviews/dashboard-reviews.component';
import { UserInfoComponent } from './dashboard/profile/user-info/user-info.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'',
        component:AuthLayoutComponent,
        children:[
            {path:'login',component:LoginComponent,title:'Giriş yap'},
            {path:'register',component:RegisterComponent,title:'Kayıt ol'},
            {path:'sifremi-unuttum',component:ForgotMainComponent,title:'Sifremi unuttum'},
            {path:'checkout',component:CheckoutComponent,canActivate :[authGuard],title:'Checkout'},
            {path:'address',component:AddressComponent,title:'AddressComponent'},
            { path: 'payment/result', component: PaymentResultComponent },
            
        ]
    },
    {
        path:'',
        component:NoneFotterLayoutComponent,
        children:[
            {path:'hesabim',component:DashboardComponent,canActivate :[authGuard],children:[

                {path:'adreslerim',component:DashboardAddressComponent,title:'Adreslerim'},
                {path:'siparislerim',component:DashboardOrdersComponent,title:'Siparişlerim'},
                {path:'siparislerim/:id',component:OrderDetailComponent,title:'Siparişim'},
                {path:'siparislerim/iade/:id',component:OrderRefundComponent,title:'İade'},
                {path:'yorumlarim',component:DashboardReviewsComponent,title:'Yorumlarım'},
                {path:'kullanici-bilgilerim',component:UserInfoComponent,title:'Kullanıcı bilgilerim'},
                

            ],title:'Hesabım'},

        ]
    },
    {
        path:'',
        component:MainLayoutComponent,
        children:[
            {path:'anasayfa',component:HomePageComponent,title:'Ana Sayfa'},
            {path:'home',component:HomeComponent,title:'Home'}, 
            {path:':slug/yorumlar',component:ReviewPageComponent,title:'Comment'},
            {path:'cart',component:CartPageComponent,canActivate:[authGuard],title:'Cart'},
            
            {path:'urun/:slug',component:EachItemPageComponent,title:'Each Item'},
    
            {path:'kampanya/:slug',component:CampaignPageComponent,title:'Kampanya'},
            
 


            {path:':slug',component:CategoryPageComponent,title:'list'},
            
        ]
    }
   
  




];

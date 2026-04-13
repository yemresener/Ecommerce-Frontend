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
export const routes: Routes = [
    {path:'',
        component:AuthLayoutComponent,
        children:[
            {path:'login',component:LoginComponent,title:'LoginComponent'},
            {path:'register',component:RegisterComponent,title:'RegisterComponent'},
            {path:'sifremi-unuttum',component:ForgotMainComponent,title:'Sifremi unuttum'},
            {path:'checkout',component:CheckoutComponent,title:'Checkout'},
            {path:'address',component:AddressComponent,title:'AddressComponent'},
            
        ]
    },
    {
        path:'',
        component:MainLayoutComponent,
        children:[
            {path:'anasayfa',component:HomePageComponent,title:'Ana Sayfa'},
            {path:'home',component:HomeComponent,title:'Home'},
            {path:':slug/yorumlar',component:ReviewPageComponent,title:'Comment'},
            {path:'cart',component:CartPageComponent,title:'Cart'},
            
            {path:'urun/:slug',component:EachItemPageComponent,title:'Each Item'},
    
            {path:'kampanya/:slug',component:CampaignPageComponent,title:'Kampanya'},
            
            {path:'hesabim',component:DashboardComponent,title:'hesabım'},
            { path: 'payment/result', component: PaymentResultComponent },


            {path:':slug',component:CategoryPageComponent,title:'list'},
            
        ]
    }
   
  




];

import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { EachItemPageComponent } from './each-item-page/each-item-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ListItemsComponent } from './list-items/list-items.component';
export const routes: Routes = [

    {path:'',component:HomePageComponent,title:'Ana Sayfa'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:':slug/yorumlar',component:ReviewPageComponent,title:'Comment'},
    {path:'cart',component:CartPageComponent,title:'Cart'},

    {path:'urun/:slug',component:EachItemPageComponent,title:'Each Item'},

    {path:':slug',component:ListItemsComponent,title:'list'},

];

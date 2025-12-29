import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { EachItemPageComponent } from './each-item-page/each-item-page.component';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
export const routes: Routes = [

    {path:'',component:HomePageComponent,title:'Ana Sayfa'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'comment',component:CommentPageComponent,title:'Comment'},
    {path:'cart',component:CartPageComponent,title:'Cart'},

    {path:':slug',component:EachItemPageComponent,title:'Each Item'},

];

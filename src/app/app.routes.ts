import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { EachItemPageComponent } from './each-item-page/each-item-page.component';
export const routes: Routes = [

    {path:'',component:HomePageComponent,title:'Ana Sayfa'},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:':slug',component:EachItemPageComponent,title:'Each Item'}

];

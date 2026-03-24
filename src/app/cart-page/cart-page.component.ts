import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { CartService } from '../Services/cart.service';
import { Cart } from '../interfaces/cart';
import { CartSummary } from '../interfaces/cart-summary';
import { FullpageLoaderComponent } from '../shared/fullpage-loader/fullpage-loader.component';
import { MainToastComponent } from '../shared/components/toast/main-toast/main-toast.component';
import { BrowserAware } from '../shared/base/browser-aware';
import { CartDetailComponent } from '../shared/components/cart/cart-detail/cart-detail.component';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule,SliderComponent,CardComponent,FullpageLoaderComponent,MainToastComponent,CartDetailComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent extends BrowserAware{

  constructor(private service:CartService){super()}


  couponInput=0;
  checked=true;
  mPrice=false;
  message!:string;
  status:'success' | 'error' | 'warning' | 'info' = 'success';


  ngOnInit(): void {
     if(this.isBrowser()){
        this.getCart(); 
    } 
  }
  carts!:Cart[];
  summary!:CartSummary;
  skeleton=true;

  getCart(){
    console.log('CART DENİYOR')
    this.service.cart().subscribe({
      next:(res)=>{
        console.log(res);
        this.carts=res.data;
        this.summary=res.summary;
        this.loading=false;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  loading=false;

  changeSelected(slug:string){
    this.message='';
    if(this.loading) return;
    this.loading=true;
    this.service.changeSelected(slug).subscribe({
      next:(res)=>{
        this.message=res.message;
        this.status='success';
        this.getCart();
      },
      error:(err)=>{
        this.message=err.error.message;
        this.status='error';
        this.loading=false;
      }
    })
  }

  deleteCart(slug:string,delete_all:boolean=false){
    this.message='';
    if(this.loading) return;
    this.loading = true;
    this.service.deleteCart(slug,delete_all).subscribe({
      next:(res)=>{
        this.message=res.message;
        this.status='success';
        this.getCart();
      },
      error:(err)=>{

        this.message=err.error.message;
        this.status='error';

        this.loading=false;
      }
    })
  }

  addCart(slug:string,quantity:number=1){
    this.message='';

    if(this.loading) return;
    this.loading = true;
    this.service.addCart(slug,quantity).subscribe({
      next:(res)=>{
        this.getCart();
        console.log(res);
        this.message=res.message;
        this.status='success';

      },
      error:(err)=>{
        console.log(err);
        this.message=err.error.message;
        this.status='error';
        this.loading=false;
      }
    })
  }



}

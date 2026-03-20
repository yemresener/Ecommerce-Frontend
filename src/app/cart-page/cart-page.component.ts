import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { CartService } from '../Services/cart.service';
import { Cart } from '../interfaces/cart';
import { CartSummary } from '../interfaces/cart-summary';
import { FullpageLoaderComponent } from '../shared/fullpage-loader/fullpage-loader.component';
import { MainToastComponent } from '../shared/components/toast/main-toast/main-toast.component';
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule,SliderComponent,CardComponent,FullpageLoaderComponent,MainToastComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  constructor(private service:CartService){}

  couponInput=0;
  checked=true;
  mPrice=false;
  message!:string;
  status:'success' | 'error' | 'warning' | 'info' = 'success';


  ngOnInit(): void {
      this.getCart();
  }
  carts!:Cart[];
  summary!:CartSummary;

  getCart(){
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
    if(this.loading) return;
    this.loading=true;
    this.service.changeSelected(slug).subscribe({
      next:(res)=>{
        this.message=res.message;
        this.status='success';
        this.getCart();
      },
      error:(err)=>{
        console.log(err)
        this.loading=false;
      }
    })
  }

  deleteCart(slug:string,delete_all:boolean=false){
    if(this.loading) return;
    this.loading = true;
    this.service.deleteCart(slug,delete_all).subscribe({
      next:(res)=>{
        console.log(res);
        this.getCart();
      },
      error:(err)=>{
        console.log(err);
        this.loading=false;
      }
    })
  }

  addCart(slug:string,quantity:number=1){
    if(this.loading) return;
    this.loading = true;
    this.service.addCart(slug,quantity).subscribe({
      next:(res)=>{
        this.getCart();
        console.log(res);

      },
      error:(err)=>{
        console.log(err);
        this.loading=false;
      }
    })
  }




/*
  recommendationProducts ={
    items:[
      { image: 'assets/images/category11.jpg', title: 'Kedi Kumu',avg:4.2,total_comments:20,original_price:'200' },
      { image: 'assets/images/category2.jpg', title: 'Kedi Konserve',avg:4.2,total_comments:20, original_price:'25' },
      { image: 'assets/images/category3.jpg', title: 'Kuş Yemi', original_price:'100',avg:4.2,total_comments:20, },
      { image: 'assets/images/category4.jpg', title: 'Köpek Maması', original_price:'300' ,avg:4.2,total_comments:20,},
      { image: 'assets/images/category5.jpg', title: 'Köpek Konserve', original_price:'2100',avg:4.2,total_comments:20, },
      { image: 'assets/images/category6.jpg', title: 'Oyuncak', original_price:'200' ,avg:4.2,commentCount:20,},
      { image: 'assets/images/category3.jpg', title: 'Oyuncak', original_price:'2300',avg:4.2,commentCount:20, },
      { image: 'assets/images/category3.jpg', title: 'Oyuncak', original_price:'200',avg:4.2,commentCount:20, },
      { image: 'assets/images/category3.jpg', title: 'Oyuncak', original_price:'200',avg:4.2,commentCount:20, },
      { image: 'assets/images/category5.jpg', title: 'Köpek Konserve', original_price:'2100',avg:4.2,commentCount:20, },
      { image: 'assets/images/category3.jpg', title: 'Oyuncak', original_price:'200',avg:4.2,commentCount:20, }
    ],
    index:0,
    visible:4,
  }

  recommendationProducts1 ={
    items:[
      { img: 'assets/images/category6.jpg', title: 'Oyuncak', price:'200' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'2300',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, },
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve', price:'2100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, },
      { img: 'assets/images/category11.jpg', title: 'Kedi Kumu',avg:4.2,commentCount:20,price:'200' },
      { img: 'assets/images/category2.jpg', title: 'Kedi Konserve',avg:4.2,commentCount:20, price:'25' },
      { img: 'assets/images/category3.jpg', title: 'Kuş Yemi', price:'100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category4.jpg', title: 'Köpek Maması', price:'300' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve', price:'2100',avg:4.2,commentCount:20, },

    ],
    index:0,
    visible:4,
  }


  */
}

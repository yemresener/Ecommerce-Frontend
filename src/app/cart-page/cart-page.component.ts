import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule,SliderComponent,CardComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  couponInput=0;
  checked=true;



  recommendationProducts ={
    items:[
      { img: 'assets/images/category11.jpg', title: 'Kedi Kumu',avg:4.2,commentCount:20,price:'200' },
      { img: 'assets/images/category2.jpg', title: 'Kedi Konserve',avg:4.2,commentCount:20, price:'25' },
      { img: 'assets/images/category3.jpg', title: 'Kuş Yemi', price:'100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category4.jpg', title: 'Köpek Maması', price:'300' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve', price:'2100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category6.jpg', title: 'Oyuncak', price:'200' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'2300',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, },
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve', price:'2100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, }
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

}

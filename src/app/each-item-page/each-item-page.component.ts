import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';

interface product{
  images:[];
  title:string;
  avg_ratings:number;
  total_comments:number;
  views:number;
  product:[];
  
}
interface SliderModel<T> {
  items: T[];
}
interface productImage{
  img:string;
}
interface sliderState{
  visible:number;
  index:number;
}


@Component({
  selector: 'app-each-item-page',
  imports: [FormsModule,CommonModule,ProductReviewComponent,SliderComponent,CardComponent],
  templateUrl: './each-item-page.component.html',
  styleUrl: './each-item-page.component.css'
})

export class EachItemPageComponent {

  itemSlider: SliderModel<productImage> = {
    items:[
      { img: 'assets/images/category11.jpg', },
      { img: 'assets/images/category2.jpg' },
      { img: 'assets/images/category3.jpg' },
      { img: 'assets/images/category4.jpg' },
      


    ]
  };
  sliderState:sliderState={
    visible:1,
    index:0,
  }
  


  next() {
    const len = this.itemSlider.items.length; 
    if (!len) return;
  
    if (this.sliderState.index === len - 1) {
      this.sliderState.index = 0;
    } else {
      this.sliderState.index++; 
    }
  }
  
  prev() {
    const len = this.itemSlider.items.length;
    if (!len) return;
    
    if (this.sliderState.index === 0) {
      this.sliderState.index = len - 1;
    } else {
      this.sliderState.index--;
    }
  
  }
  
  getTransform() {
    return `translateX(-${this.sliderState.index * 100}%)`;
  }
// MOBILE SWIPE 


  touchStartX=0;
  touchEndX=0;

  onTouchStart(event:TouchEvent){
    this.touchStartX=event.touches[0].clientX;
  }
  onTouchEnd(event:TouchEvent){
    this.touchEndX=event.changedTouches[0].clientX;
    this.handleSwipe();
  }
  handleSwipe(){
    const diff = this.touchStartX - this.touchEndX;

    if(Math.abs(diff)<50) return;
    if(diff>0){
      this.next();
    }
    else{
      this.prev();
    }
  }

  // MOBILE SWIPE 


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
    visible:5,
  }

  
  categoryBests ={
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
    visible:5,
  }
  
  



  }





import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';

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
  imports: [FormsModule,CommonModule,ProductReviewComponent],
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



  }





import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { SliderModel } from '../shared/components/slider/slider.model';

interface Slide{
  img:string;
  title?:string;
}



@Component({
  selector: 'app-home',
  imports: [CommonModule,SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 

  slides:Slide[]=[];
  currentIndex=0;
  ngOnInit() {
    this.slides=this.loadSlides();
    
  }

  loadSlides():Slide[]{
    const images = ['bannerRoyal.jpg', 'bannerHill.jpg','bannerNd.jpg']; 
    return images.map(img=>({img:`assets/images/${img}`}));
  }

  nextSlide(){
      if(this.slides.length===0) return;
      this.currentIndex=(this.currentIndex+1)%this.slides.length;
  }
  prevSlide() {
    if (this.slides.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  isActive(index: number): boolean {
    return index === this.currentIndex;
  }

  categorySlider: SliderModel = {
    items: [
      { img: 'assets/images/category11.jpg', title: 'Kedi Kumu' },
      { img: 'assets/images/category2.jpg', title: 'Kedi Konserve' },
      { img: 'assets/images/category3.jpg', title: 'Kuş Yemi' },
      { img: 'assets/images/category4.jpg', title: 'Köpek Maması' },
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve' },
      { img: 'assets/images/category6.jpg', title: 'Oyuncak' },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak' },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak' },
    ],
    index: 0,
    visible: 5
  };
  
  bestSellerSlider: SliderModel = {
    items: [
      { img: 'assets/images/category11.jpg', title: 'Kedi Kumu',avg:4.2,commentCount:20,price:'200' },
      { img: 'assets/images/category2.jpg', title: 'Kedi Konserve',avg:4.2,commentCount:20, price:'25' },
      { img: 'assets/images/category3.jpg', title: 'Kuş Yemi', price:'100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category4.jpg', title: 'Köpek Maması', price:'300' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve', price:'2100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category6.jpg', title: 'Oyuncak', price:'200' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'2300',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, }
    ],
    index: 0,
    visible: 5
  };
  
  forYouSlider: SliderModel = {
    items: [
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'200',avg:4.2,commentCount:20, },
      { img: 'assets/images/category6.jpg', title: 'Oyuncak', price:'200' ,avg:4.2,commentCount:20,},

      { img: 'assets/images/category11.jpg', title: 'Kedi Kumu',avg:4.2,commentCount:20,price:'200' },
      { img: 'assets/images/category2.jpg', title: 'Kedi Konserve',avg:4.2,commentCount:20, price:'25' },
      { img: 'assets/images/category3.jpg', title: 'Kuş Yemi', price:'100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category4.jpg', title: 'Köpek Maması', price:'300' ,avg:4.2,commentCount:20,},
      { img: 'assets/images/category5.jpg', title: 'Köpek Konserve', price:'2100',avg:4.2,commentCount:20, },
      { img: 'assets/images/category3.jpg', title: 'Oyuncak', price:'2300',avg:4.2,commentCount:20, },
    ],
    index: 0,
    visible: 5
  };


  MaxIndex(slider:SliderModel){
    return slider.items.length-slider.visible;
  }


  next(slider:SliderModel){
    const max = this.MaxIndex(slider);
    console.log(max);
    if(max - slider.index ===1){
      slider.index++;
    }else if(slider.index<max){
      slider.index+=2;
    }
  }



  prev(slider:SliderModel){
    if(slider.index===1){
      slider.index--;
    }else if (slider.index>0){
      slider.index-=2;
    }
  }

 /* goTo(i:number){
    this.categoryIndex=i;
  }*/
  getTransform(slider:SliderModel){
    return `translateX(-${slider.index * 242}px)`; 
  }

}

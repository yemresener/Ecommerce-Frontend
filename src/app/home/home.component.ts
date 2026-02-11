import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { SliderModel } from '../shared/components/slider/slider.model';
import { CardComponent } from '../shared/components/product/card/card.component';
import { SliderServiceService } from '../Services/slider-service.service';
import { HomeSection } from '../models/home-section';
import { BannerSectionComponent } from '../components/sections/banner-section/banner-section.component';
import { CategorySliderComponent } from '../components/sections/category-slider/category-slider.component';
import { ProductSectionComponent } from '../components/sections/product-section/product-section.component';
import { MainSliderComponent } from '../components/sections/main-slider/main-slider.component';
import { CategorySectionComponent } from '../components/sections/category-section/category-section.component';
import { MainSectionComponent } from '../components/sections/main-section/main-section.component';



@Component({
  selector: 'app-home',
  imports: [CommonModule,SliderComponent,CardComponent,CategorySliderComponent,CategorySectionComponent,MainSectionComponent,ProductSectionComponent,BannerSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 
  constructor(public sliderService:SliderServiceService){}
  currentIndex=0;
  ngOnInit() {
    //this.loadSliders();
    this.loadLayouts();
  }

  sliders:HomeSection[]=[];

  skeleton:boolean=true;
 /* loadSliders(){
    this.sliderService.getSlider('home').subscribe({
      next:(res:any)=>{
      console.log('normal',res.data);
      this.sliders = res.data;
      this.skeleton=false;

      console.log('sliders',this.sliders);
      console.log('sliderler knak',this.sliders)

      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
    */
  layout: any = [
    { type: 'main_slider', skeleton: true },
    { type: 'banner', skeleton: true },
    { type: 'banner_campaign', skeleton: true },
  ];

  loadLayouts(){
    this.sliderService.getLayout('home').subscribe({
      next:(res)=>{
        this.layout=res;
        console.log('layouts',res);

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }



  /*
  mapSection(s: any): HomeSection {
    return {
      id: s.id,
      sectionType: s.type,              // banner, hero
      title: s.title,
      itemType: s.items[0]?.type,       // category, product
      items: this.mapItems(s.items)
    };
  }

  mapItems(items: any[]) {
    return items.map(i => {
  
      // CATEGORY
      if (i.type === 'category') {
        return {
          id: i.ref.id,
          title: i.ref.name,
          img: i.ref.image ?? 'assets/category1.jpg',
          slug: i.ref.slug
        };
      }
  
      // PRODUCT / ADVERT
      if (i.type === 'product') {
        return {
          id: i.ref.id,
          title: i.ref.title,
          price: i.ref.price,
          avg_rating: i.ref.avg_rating ?? 0,
          total_comments: i.ref.total_comments ?? 0,
          img: i.ref.images?.[0] ?? 'assets/no-product.png',
          item_ref:i.ref.item_ref
        };
      }
  
      return i;
    });
  }
 */
/* PROTOTYPE */
 /*
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


*/

}

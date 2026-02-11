import { Component,ViewChild,ElementRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { EachItemService } from '../Services/each-item.service';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../interfaces/advert';
import { SliderModel } from '../shared/components/slider/slider.model';
import { ProductSectionComponent } from '../components/sections/product-section/product-section.component';
import { MiniAdvert } from '../interfaces/mini-advert';
import { ApiResponse } from '../interfaces/api-response';
import { Review } from '../interfaces/review';
import { PaginationMeta } from '../interfaces/pagination-meta';
import { ReviewResponse } from '../interfaces/review-response';
import { ReviewStats } from '../interfaces/review/review-stats';
import { RatingStarsComponent } from '../shared/rating/rating-stars/rating-stars.component';
import { BreadCrumb } from '../interfaces/bread-crumb';

import { ProductSliderComponent } from '../components/sections/product-slider/product-slider.component';
interface product{
  images:[];
  title:string;
  avg_ratings:number;
  total_comments:number;
  views:number;
  product:[];
  
}
interface SliderModelws<T> {
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
  imports: [ProductSliderComponent,FormsModule,CommonModule,ProductReviewComponent,SliderComponent,CardComponent,RatingStarsComponent],
  templateUrl: './each-item-page.component.html',
  styleUrl: './each-item-page.component.css'
})

export class EachItemPageComponent {
  @ViewChild('categoryAdverts') categoryAdverts!: ElementRef;

  constructor(private route:ActivatedRoute,private itemService:EachItemService){}

  slug!:string;
  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      this.slug = params.get('slug') ?? '';
      this.getAdvert();
    })

  }

  advert!:Advert;
  itemSlider!:SliderModel<any>
  breadcrumb!: BreadCrumb[];
  getAdvert(){
    this.itemService.getAdvert(this.slug).subscribe({
      next:(res)=>{

        this.advert=res.data.advert;
        this.breadcrumb=res.data.bread_crumb;
        console.log(this.breadcrumb,'RES KANKA');
        
        if(this.advert?.item_ref?.images?.length){
          this.itemSlider={
            items:this.advert.item_ref.images,
            index:0,
            visible:1
          }
          console.log('slider',this.itemSlider);
        }
        console.log('porduct',this.advert?.product_id)
       this.getReviews();

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  popularAdverts: MiniAdvert[] = [];
  getPopularAdverts(){
    this.itemService.popularAdvertsByCategory(this.slug).subscribe({
      next:(res: ApiResponse<MiniAdvert[]>)=>{
        this.popularAdverts=res.data;
        console.log('POPRES',res);
        console.log('sa',this.popularAdverts);

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  recoAdverts!:MiniAdvert[];
  getRecoAdverts(){
    this.itemService.recoAdvertsByFeature(this.slug).subscribe({
      next:(res:ApiResponse<MiniAdvert[]>)=>{
        this.recoAdverts=res.data;
        console.log('RECOLAR',this.recoAdverts);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  reviews!:Review[];
  meta!:PaginationMeta;
  stats!:ReviewStats;
  skeleton=true;

  getReviews(){
    this.itemService.getReviews(this.advert?.slug).subscribe({
      next:(res:ApiResponse<ReviewResponse>)=>{
        console.log('RESSS',res)
        this.reviews=res.data.reviews;
        this.meta=res.meta;
        this.stats=res.data.stats;
          console.log('reviews',this.reviews)
        console.log('counts',this.meta)
        console.log('STATS',this.stats);
        this.skeleton=false;

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  sliderSkeleton:boolean=true;
  ngAfterViewInit(): void {

      const observer = new IntersectionObserver(enter=>{
        if(enter[0].isIntersecting){
          this.getPopularAdverts();
          this.getRecoAdverts();
          observer.disconnect();
          this.sliderSkeleton=false;
        }
      },{ threshold: 0.2 });

      observer.observe(this.categoryAdverts.nativeElement);

  }


  



  next() {
    const len = this.itemSlider.items.length; 
    if (!len) return;
  
    if (this.itemSlider.index === len - 1) {
      this.itemSlider.index = 0;
    } else {
      this.itemSlider.index++; 
    }
  }
  
  prev() {
    const len = this.itemSlider.items.length;
    if (!len) return;
    
    if (this.itemSlider.index === 0) {
      this.itemSlider.index = len - 1;
    } else {
      this.itemSlider.index--;
    }
  
  }
  
  getTransform() {
    return `translateX(-${this.itemSlider.index * 100}%)`;
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


}


/*

  
  itemSlider: SliderModelws<productImage> = {
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

*/



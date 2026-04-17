import { Component,ViewChild,ElementRef,PLATFORM_ID, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { EachItemService } from '../Services/each-item.service';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../interfaces/advert';
import { SliderModel } from '../shared/components/slider/slider.model';
import { MiniAdvert } from '../interfaces/mini-advert';
import { ApiResponse } from '../interfaces/api-response';
import { Review } from '../interfaces/review';
import { PaginationMeta } from '../interfaces/pagination-meta';
import { ReviewResponse } from '../interfaces/review-response';
import { ReviewStats } from '../interfaces/review/review-stats';
import { RatingStarsComponent } from '../shared/rating/rating-stars/rating-stars.component';
import { BreadCrumb } from '../interfaces/bread-crumb';
import { RouterModule } from '@angular/router';
import { ProductSliderComponent } from '../components/sections/product-slider/product-slider.component';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../Services/cart.service';
import { CartToastComponent } from '../shared/components/toast/cart-toast/cart-toast.component';
import { ToastrService } from 'ngx-toastr';
import { MainToastComponent } from '../shared/components/toast/main-toast/main-toast.component';
import { DeliveryMessageService } from '../NoApiServices/delivery-message.service';
@Component({
  selector: 'app-each-item-page',
  imports: [ProductSliderComponent,FormsModule,CommonModule,ProductReviewComponent,
    SliderComponent,CardComponent,RatingStarsComponent,RouterModule,CartToastComponent,
  MainToastComponent,],
  templateUrl: './each-item-page.component.html',
  styleUrl: './each-item-page.component.css'
})

export class EachItemPageComponent {
  @ViewChild('categoryAdverts') categoryAdverts!: ElementRef;
  private platformId = inject(PLATFORM_ID);
  private isBrowser() { return isPlatformBrowser(this.platformId); }

  constructor(private route:ActivatedRoute,
    private itemService:EachItemService, 
    private cartService:CartService,
    private toast:ToastrService,
    private deliveryService:DeliveryMessageService
  ){}

  slug!:string;
  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      this.slug = params.get('slug') ?? '';
      this.getAdvert();
      this.deliveryMessage=this.deliveryService.deliveryMessage;

    })

  }
  advert!:Advert;
  itemSlider!:SliderModel<any>
  breadcrumb!: BreadCrumb[];
  isActive?:boolean;
  deliveryMessage?:string;

  getAdvert(){
    this.itemService.getAdvert(this.slug).subscribe({
      next:(res)=>{
        this.advert=res.data.advert;
        this.breadcrumb=res.data.bread_crumb;
        this.isActive=res.data.active_stock;        
        if(this.advert.images){
          this.itemSlider={
            items:this.advert.images,
            index:0,
            visible:1
          }
          console.log('slider',this.itemSlider);
        }

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
      if (!this.isBrowser()) return; 

      
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

  cartLoading = false;
  cartItemAdded=false;
  cartMessage?:string;
  cartErrorMessage:string='';

  addToCart(slug:string,quantity:number=1){
    this.cartLoading=true;
    this.cartService.addCart(slug,quantity).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartLoading=false;
        this.cartItemAdded=false;
        this.cartMessage=res.message
        
        setTimeout(() => {
          this.cartItemAdded = true;  
        }, 50);
      },
      error:(err)=>{
        console.log(err)
        this.cartLoading=false;
        this.cartErrorMessage=err.error.message;
      }
    })      

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





import { Component,ViewChild,ElementRef,Optional,Inject, TransferState, makeStateKey } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductReviewComponent } from '../../features/review/product-review/advert-review.component';
import { CardComponent } from '../../shared/components/product/card/card.component';
import { AdvertItemService } from '../../features/advert-item/advert-item.service';
import { ActivatedRoute } from '@angular/router';
import { Advert } from '../../features/advert/interfaces/advert';
import { SliderModel } from '../../shared/components/sliders/slider/slider.model';
import { MiniAdvert } from '../../features/advert/interfaces/mini-advert';
import { ApiResponse } from '../../interfaces/api-response';
import { Review } from '../../features/review/interfaces/review';
import { PaginationMeta } from '../../interfaces/pagination-meta';
import { ReviewResponse } from '../../features/review/interfaces/review-response';
import { ReviewStats } from '../../features/review/interfaces/review-stats';
import { RatingStarsComponent } from '../../features/review/rating-stars/rating-stars.component';
import { BreadCrumb } from '../../features/category/interfaces/bread-crumb';
import { RouterModule } from '@angular/router';
import { ProductSliderComponent } from '../../shared/components/sliders/product-slider/product-slider.component';
import { CartService } from '../../features/cart/cart.service';
import { CartToastComponent } from '../../shared/components/toast/cart-toast/cart-toast.component';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { SeoService } from '../../core/seo-service/seo.service';
import { BrowserAware } from '../../shared/base/browser-aware';
import { RESPONSE_TOKEN } from '../../core/tokens/response.token';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { SliderComponent } from '../../shared/components/sliders/slider/slider.component';
import { DeliveryMessageService } from '../../Services/NoApiServices/delivery-message.service';

@Component({
  selector: 'app-advert-item-page',
  imports: [ProductSliderComponent,FormsModule,CommonModule,ProductReviewComponent,
    SliderComponent,CardComponent,RatingStarsComponent,RouterModule,CartToastComponent,
  MainToastComponent,NotFoundComponent],
  templateUrl: './advert-item-page.component.html',
  styleUrl: './advert-item-page.component.css'
})

export class EachItemPageComponent extends BrowserAware{
  @ViewChild('categoryAdverts') categoryAdverts!: ElementRef;

  constructor(
    private route:ActivatedRoute,
    private itemService:AdvertItemService, 
    private cartService:CartService,
    private deliveryService:DeliveryMessageService,
    private seoService:SeoService,
    private transferState: TransferState,
    @Optional() @Inject(RESPONSE_TOKEN) private response: any
  ){super()}

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
  notFound=false

  getAdvert(){

    const ERROR_KEY = makeStateKey<boolean>('404_error_' + this.slug);
    console.log('ERROR SLUG',ERROR_KEY);
  // 2. ADIM: Eğer tarayıcıdaysak ve sunucu "bu sayfa 404" diye not bıraktıysa, API'ye HİÇ GİTME!
    if (this.transferState.hasKey(ERROR_KEY)) {
      this.notFound = true;
    console.log('ERROR SLUG',ERROR_KEY);

      return; // Fonksiyonu burada kes, 2. isteği engelle
    }

    this.itemService.getAdvert(this.slug).subscribe({
      next:(res)=>{
        this.advert=res.data.advert;
        this.breadcrumb=res.data.bread_crumb;
        this.isActive=res.data.active_stock;     
        this.reviews=res.data.advert.reviews;
        console.log(this.reviews,'REVİEWS');
        this.stats=res.stats;
        this.skeleton=false;
        console.log(res.stats,'RESSSS')
        console.log(this.stats,'STAT');
        this.seoService.setAdvertPage(this.advert,this.reviews);   
        if(this.advert.images){
          this.itemSlider={
            items:this.advert.images,
            index:0,
            visible:1
          }
          console.log('slider',this.itemSlider);
        }

       

      },
      error:(err)=>{
        console.log(err);
        this.notFound = true;
        this.seoService.setNotFound();
        if (!this.isBrowser()) {
          this.transferState.set(ERROR_KEY, true);
          this.response.status(404);
 
        }
        
      }
    })
  }


/*
  getAdvert(){
    this.itemService.getAdvert(this.slug).subscribe({
      next:(res)=>{
        this.advert=res.data.advert;
        this.breadcrumb=res.data.bread_crumb;
        this.isActive=res.data.active_stock;     
        this.seoService.setAdvertPage(this.advert);   
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
  */

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





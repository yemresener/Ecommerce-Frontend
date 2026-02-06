import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewServiceService } from '../Services/review-service.service';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../interfaces/api-response';
import { ReviewResponse } from '../interfaces/review-response';
import { MiniAdvert } from '../interfaces/mini-advert';
import { Review } from '../interfaces/review';
import { ReviewStats } from '../interfaces/review/review-stats';
import { PaginationMeta } from '../interfaces/pagination-meta';
import { Router } from '@angular/router';
import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';
import { FilterParams } from '../interfaces/filter-params';
import { ReviewFilterComponent } from '../pages/product/review-filter/review-filter.component';
import { Links } from '../interfaces/links';
import { ProductReviewSkeletonComponent } from '../shared/skeleton/product-review-skeleton/product-review-skeleton.component';
@Component({
  selector: 'app-review-page',
  imports: [CommonModule,ProductReviewComponent,ReviewFilterComponent,ProductReviewSkeletonComponent],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css'
})
export class ReviewPageComponent {

  constructor(private reviewService:ReviewServiceService,private route:ActivatedRoute,private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.slug=params.get('slug') ?? '';
      this.getPage()
    })
    this.route.queryParams.subscribe(params => {
      const filters: FilterParams = {};

      if (params['rating']) filters.rating = +params['rating'];
      if (params['sort_by']) filters.sort_by = params['sort_by'];
      if (params['order']) filters.order = params['order'];

      this.currentFilters = filters;
      this.fetchReviews(true); 
    });
   
  }
  stars = [1,2,3,4,5];
  slug!:string;
  advert!:MiniAdvert
  reviews!:Review[]
  stats!:ReviewStats
  meta!:PaginationMeta
  links!:Links;
  currentFilters!:FilterParams;
  
  getPage(){
    this.reviewService.getReview(this.slug).subscribe({
      next:(res:ApiResponse<ReviewResponse>)=>{
        console.log('harhar',res);
        this.advert=res.data.advert;
        this.stats=res.data.stats;
      }
    })
  }

  params:FilterParams={
    slug:this.slug,
    
  }

  skeleton=true;
  loading=false;
  fetchReviews(reset=false){
    if(this.loading) return;
    if(!reset && this.meta && this.meta.current_page >= this.meta.last_page) return;

    this.loading=true;


    const page =reset ? 1: (this.meta?.current_page ?? 0) +1;
    this.reviewService.filterReview({
      slug:this.slug,
      page,
      ...this.currentFilters
    })
    .subscribe(res=>{
      this.reviews=reset ? res.data : [...this.reviews, ...res.data];

      this.meta =res.meta;
      this.links=res.links;
      this.loading=false;
      this.skeleton = false;
    })
  }

  
  onFilterChange(params: FilterParams){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        rating: params.rating ?? undefined,
        sort_by: params.sort_by ?? undefined,
        order: params.order ?? undefined
      }
    });
  }


  loadMore(){
    this.fetchReviews(false);
  }


  commentPopUp = 0;
  rating=0;
  hoverRating=0;

  setRating(value:number){
    this.rating=value;
  }
  setHover(value:number){
    this.hoverRating=value;
  }
  clearHover(){
    this.hoverRating=0;
  }

}

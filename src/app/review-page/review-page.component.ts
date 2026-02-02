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

import { ProductReviewComponent } from '../pages/product/product-review/product-review.component';
@Component({
  selector: 'app-review-page',
  imports: [CommonModule,ProductReviewComponent],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css'
})
export class ReviewPageComponent {

  constructor(private reviewService:ReviewServiceService,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.slug=params.get('slug') ?? '';
      this.getPage()
    })
  }
  stars = [1,2,3,4,5];
  slug!:string;
  advert!:MiniAdvert
  reviews!:Review[]
  stats!:ReviewStats
  meta!:PaginationMeta
  getPage(){
    this.reviewService.getReview(this.slug).subscribe({
      next:(res:ApiResponse<ReviewResponse>)=>{
        console.log('harhar',res);
        this.advert=res.data.advert;
        this.reviews=res.data.reviews;
        this.stats=res.data.stats;
      }
    })
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

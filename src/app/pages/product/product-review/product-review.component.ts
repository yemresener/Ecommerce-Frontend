import { Component,Input,SimpleChanges,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Advert } from '../../../interfaces/advert';
import { Review } from '../../../interfaces/review';
import { PaginationMeta } from '../../../interfaces/pagination-meta';
import { ReviewServiceService } from '../../../Services/review-service.service';
import { ActivatedRoute } from '@angular/router';
import { MiniAdvert } from '../../../interfaces/mini-advert';
import { ReviewResponse } from '../../../interfaces/review-response';
import { ApiResponse } from '../../../interfaces/api-response';
import { ReviewStats } from '../../../interfaces/review/review-stats';
import { RatingStarsComponent } from '../../../shared/rating/rating-stars/rating-stars.component';
import { FilterParams } from '../../../interfaces/filter-params';
@Component({
  selector: 'app-product-review',
  imports: [CommonModule,FormsModule,RatingStarsComponent],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent {
  constructor(private reviewService:ReviewServiceService,private route:ActivatedRoute){}

  @Input() addCart:boolean=false;
  @Input() advert!:MiniAdvert;
  @Input() reviews!:Review[];
  @Input() meta!:PaginationMeta;
  @Input() stats!:ReviewStats;


  stars = [1,2,3,4,5];


  
  
  /* ngOnChanges(changes: SimpleChanges): void {

    if(changes['advert']){
      console.log('advert kankam',this.advert);
    }
  } */
/*
  slug!:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.slug= params.get('slug') ?? '';
      this.getPage();
    })
    
  }
  getPage(){
    return this.reviewService.getReview(this.slug).subscribe({
      next:(res: ApiResponse<ReviewResponse>)=>{
        this.advert=res.data.advert;
        this.reviews=res.data.reviews;
        console.log('review ha',res);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  */







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

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
import { Links } from '../../../interfaces/links';
@Component({
  selector: 'app-product-review',
  imports: [CommonModule,FormsModule,RatingStarsComponent],
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent {
  constructor(private reviewService:ReviewServiceService,private route:ActivatedRoute){}
  @Output() loadMore = new EventEmitter<FilterParams>();

  @Input() addCart:boolean=false;
  @Input() advert!:MiniAdvert;
  @Input() reviews!:Review[];
  @Input() meta!:PaginationMeta;
  @Input() stats!:ReviewStats;
  @Input() links!:Links;
  //@Input() skeleton=true;
 
  skeleton=true;

  stars = [1,2,3,4,5];
  imgLoading = true;
  
  loadMorePaginate(){
    this.loadMore.emit();
  }
  

  get ratingRows() {
    const s = this.stats;
  
    if (!s) return [];
  
    return [
      { star: 5, avg: s.five_avg || 0, count: s.five || 0 },
      { star: 4, avg: s.four_avg || 0, count: s.four || 0 },
      { star: 3, avg: s.three_avg || 0, count: s.three || 0 },
      { star: 2, avg: s.two_avg || 0, count: s.two || 0 },
      { star: 1, avg: s.one_avg || 0, count: s.one || 0 }
    ];
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

import { Component,Input,SimpleChanges,Output,EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Review } from '../interfaces/review';
import { PaginationMeta } from '../../../interfaces/pagination-meta';
import { ActivatedRoute } from '@angular/router';
import { MiniAdvert } from '../../advert/interfaces/mini-advert';
import { ReviewStats } from '../interfaces/review-stats';
import { RatingStarsComponent } from '../rating-stars/rating-stars.component';
import { FilterParams } from '../../../shared/filter/filter-params';
import { Links } from '../../../interfaces/links';
import { FullpageLoaderComponent } from '../../../shared/fullpage-loader/fullpage-loader.component';
import { ReviewServiceService } from '../services/review-service.service';

@Component({
  selector: 'app-advert-review',
  imports: [CommonModule,FormsModule,RatingStarsComponent,FullpageLoaderComponent],
  templateUrl: './advert-review.component.html',
  styleUrl: './advert-review.component.css'
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
  @Input() skeleton=true;
  @Input() isLoading=false;

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




}

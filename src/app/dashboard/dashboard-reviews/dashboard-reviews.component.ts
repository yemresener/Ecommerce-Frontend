import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from '../../review/review-list/review-list.component';
import { ReviewServiceService } from '../../Services/review-service.service';
import { Review } from '../../interfaces/review';
import { BrowserAware } from '../../shared/base/browser-aware';
import { Router } from '@angular/router';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { DeleteConfirmComponent } from '../../shared/components/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-dashboard-reviews',
  imports: [CommonModule,ReviewListComponent,MainToastComponent,DeleteConfirmComponent],
  templateUrl: './dashboard-reviews.component.html',
  styleUrl: './dashboard-reviews.component.css'
})
export class DashboardReviewsComponent extends BrowserAware{
  service = inject(ReviewServiceService);

  constructor( private router:Router){super()
  }

  reviews = this.service.getReviews();
  loading = this.service.getLoading(); 

  ngOnInit() {
    if(this.isBrowser()){
      if(!this.reviews()?.length){
        this.service.review();
      }
    }
  }


  showDeleteConfirm=false;
  confirmMessage='Yorumu silmek istediğinizden emin misiniz?';

  selectedReview?:Review;
  showDelete(review:Review){
    this.showDeleteConfirm=true;
    this.selectedReview=review;
  }
  

  status:'success' | 'error' | 'warning' | 'info' = 'success';
  toastMessage='';

  deleteReview(){
    this.showDeleteConfirm=false;
    if(this.selectedReview){
      this.service.deleteReview(this.selectedReview.id).subscribe({
        next:(res)=>{
          console.log(res);
          this.toastMessage=res.message;
          this.status='success';


        },
        error:(err)=>{
          console.log(err);
          this.toastMessage = err.error.message;
  
        }
      })
    }
    
  }

  onDeleteCancel(){
    this.showDeleteConfirm=false;
    this.selectedReview=undefined;
  }

  reDirectAdvert(slug:string){
    this.router.navigate([`/${slug}/yorumlar`]);
  }
}

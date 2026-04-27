import { Component } from '@angular/core';
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
  constructor(private service:ReviewServiceService, private router:Router){super()}
  reviews!:Review[];
  loading:boolean =true;
  ngOnInit() {
    if(this.isBrowser()){
      this.getReviews();
    }
  }

  getReviews(){
    this.loading=true;
    this.service.review().subscribe({
      next:(res)=>{
        console.log(res);
        this.reviews=res.data;
        this.loading=false;

      },
      error:(err)=>{
        console.log(err);
        this.loading=false;

      }
    })
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
          this.reviews = this.reviews.filter(r => r.id !== this.selectedReview!.id);

  
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

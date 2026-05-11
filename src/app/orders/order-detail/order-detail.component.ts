import { Component } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order/order';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressInterface } from '../../interfaces/address-interface';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { DeleteConfirmComponent } from '../../shared/components/delete-confirm/delete-confirm.component';
import { FullpageLoaderComponent } from '../../shared/fullpage-loader/fullpage-loader.component';
import { BrowserAware } from '../../shared/base/browser-aware';
import { RatingStarsComponent } from '../../shared/rating/rating-stars/rating-stars.component';
import { CreateReviewModalComponent } from '../../shared/components/review/create-review-modal/create-review-modal.component';
import { UserReviewService } from '../../Services/user-review.service';
@Component({
  selector: 'app-order-detail',
  imports: [CommonModule,MainToastComponent,DeleteConfirmComponent,
    FullpageLoaderComponent,RatingStarsComponent,CreateReviewModalComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent extends BrowserAware{
  constructor(private service:OrderService,private route:ActivatedRoute,
    private router:Router, private userService:UserReviewService ){super()}

  order!:Order;
  id!:number;
  address!:AddressInterface;

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params=>{
      this.id=Number(params.get('id')) ?? '';
      this.getOrder()
    })
  }

  getOrder(){
    if(this.order) return;
    this.service.order(this.id).subscribe({
      next:(res)=>{
        console.log(res);
        this.order = res.data;
     
        this.address=res.data.shipping_address;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  toastMessage!:string;
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  showCancelConfirm=false;
  confirmMessage= 'Siparişi iptal etmek istediğinize emin misiniz?';
  loading =false;

  cancelOrder(){
    this.loading = true;
    this.showCancelConfirm=false;
    this.service.cancelOrder(this.order.id).subscribe({
      next:(res)=>{
        this.order.status='cancelled';
        this.status="success"
        this.toastMessage='Sipariş iptal edildi.'
        this.loading = false;

      },
      error:(err)=>{
        this.status="error"
        this.toastMessage=err.error.message;
        this.loading = false;

      }
    })
  }


  navigateRefund(){
    this.router.navigate([`hesabim/siparislerim/iade/${this.id}`]);
  }

  getCargoProgress(status: string): number {
    switch (status) {
      case 'paid': return 15;
      case 'preparing': return 15;
      case 'partial': return 100;
      case 'shipped': return 50;
      
      case 'received': return 75;
      case 'rejected': return 100;

      case 'completed': return 100;
      case 'delivered': return 100;

      default: return 0;
    }
  }

  refundDetail=true;

  
  showRefundDetail(){
    this.refundDetail=!this.refundDetail;
  }

  directRefunds(){
    this.refundDetail=true;
    if (this.isBrowser()) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight, // Sayfanın en alt noktası
          behavior: 'smooth'               // Yumuşak kayış
        });
      }, 50); // DOM'un güncellenmesi için minik bir nefes payı
    }
  }

  backBtn(){
    this.router.navigate([`/hesabim/siparislerim`]);
  }


  reviewShow=false;
  selectedId?:number;

  reviewOpen(id:number){
    console.log(id);
    this.selectedId = id;
    this.reviewShow=true;
  }

  reviewClose(){
    this.selectedId=undefined;
    this.reviewShow=false;
  }

  onReviewConfirm(body:{rating:number,commentText:string}){
    if(!this.selectedId) return;
    this.loading=true;
    const payload = {
      rating:body.rating,
      comment:body.commentText,
      order_item_id:this.selectedId
    }
    this.userService.createReview(payload).subscribe({
      next:(res)=>{
        const item = this.order.order_items.find(i => i.id === this.selectedId);
        if(item) item.review = {rating:res.rating};
        console.log(res);
        this.toastMessage=res.message;
        this.status='success';
        this.reviewClose();
        this.loading=false;
        
      },
      error:(err)=>{
        console.log(err);

        this.toastMessage=err.error.message;
        this.status='error';

        this.loading=false;
      }
    })
  }
  
}

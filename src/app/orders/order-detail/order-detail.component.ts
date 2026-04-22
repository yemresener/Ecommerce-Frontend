import { Component } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order/order';
import { ActivatedRoute } from '@angular/router';
import { AddressInterface } from '../../interfaces/address-interface';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { DeleteConfirmComponent } from '../../shared/components/delete-confirm/delete-confirm.component';
import { FullpageLoaderComponent } from '../../shared/fullpage-loader/fullpage-loader.component';
@Component({
  selector: 'app-order-detail',
  imports: [CommonModule,MainToastComponent,DeleteConfirmComponent,FullpageLoaderComponent],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  constructor(private service:OrderService,private route:ActivatedRoute){}
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



}

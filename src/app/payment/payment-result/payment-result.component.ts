import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../Services/payment.service';
import { Router } from '@angular/router';
import { Order } from '../../interfaces/order/order';
import { OrderItems } from '../../interfaces/order/order-items';
@Component({
  selector: 'app-payment-result',
  imports: [CommonModule],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent {
  status: string;
  orderId: string;
  token: string;

  constructor(private route: ActivatedRoute,private router:Router, private service:PaymentService) {
    this.status  = this.route.snapshot.queryParams['status'];
    this.orderId = this.route.snapshot.queryParams['order_id'];
    this.token = this.route.snapshot.queryParams['token'];

  }
  ngOnInit(): void {

    this.result()
  }

  order!:Order;
  orderItems!:OrderItems[];
  result(){
    if(!this.token) return;
      this.service.getResult(this.token).subscribe({
        next:(res)=>{
          console.log(res)
          this.order=res.data;
          this.orderItems=res.data.order_items;
          console.log(res.data.order_items);
        },
        error:(err)=>{
          console.log(err)
            this.router.navigate(['/cart']);
        }
      })
  }


  home(){
    this.router.navigate(['/cart']);
  }

}

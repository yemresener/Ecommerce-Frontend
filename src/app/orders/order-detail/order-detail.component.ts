import { Component } from '@angular/core';
import { OrderService } from '../Services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order/order';
import { ActivatedRoute } from '@angular/router';
import { AddressInterface } from '../../interfaces/address-interface';
@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
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

}

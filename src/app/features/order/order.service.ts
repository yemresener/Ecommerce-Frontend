import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from './interfaces/order';
import { PaginationMeta } from '../../interfaces/pagination-meta';
import { AddressInterface } from '../address/address-interface';
import { OrderItems } from './interfaces/order-items';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }


  orders(params:{page:number,status:string | undefined}){
    const url = `${environment.apiUrl}orders`;
    return this.http.get<{data:Order[], meta:PaginationMeta}>(url,{
        params:params as any,
      withCredentials:true});
  }


  order(id:number){
    const url = `${environment.apiUrl}order/${id}`;
    return this.http.get<{data:Order,address:AddressInterface}>(url,{withCredentials:true});
  }

  cancelOrder(id:number){
    const url = `${environment.apiUrl}order/cancel/${id}`;
    return this.http.post(url,{},{withCredentials:true});
  }

  getRefundPage(id:number){
    const url = `${environment.apiUrl}order/refundInfo/${id}`;
    return this.http.get<{data:OrderItems[]}>(url,{withCredentials:true});
  }

  createRefundRequest(id:number,payload:{order_items:{item_id:number,quantity:number}[],
    reason:string})
    {
    const url = `${environment.apiUrl}order/refundRequest/${id}`;
    return this.http.post(url,payload,{withCredentials:true});
  }



}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Order } from '../../interfaces/order/order';
import { PaginationMeta } from '../../interfaces/pagination-meta';
import { AddressInterface } from '../../interfaces/address-interface';
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


}

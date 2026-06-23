import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApplyCouponInterface } from './interfaces/apply-coupon-interface';
import { CartApiResponse } from '../cart/interfaces/cart-api-response';
@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http:HttpClient) { }

  applyCoupon(coupon_code:string){
    const url = `${environment.apiUrl}coupon/apply`;
    return this.http.post<ApplyCouponInterface>(url,{coupon_code},{withCredentials:true});
  }

  getCart(){
    const url = `${environment.apiUrl}checkout/cart`;
    return this.http.get<CartApiResponse>(url,{withCredentials:true});
  }


}

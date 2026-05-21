import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Checkout } from './checkout';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  checkout(){
    const url = `${environment.apiUrl}prepareOrder`;
    return this.http.post<Checkout>(url,null,{withCredentials:true});
  }

}

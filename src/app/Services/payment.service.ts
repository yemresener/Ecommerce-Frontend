import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Order } from '../interfaces/order/order';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  preparePayment(cardData:any) : Observable<any> {
    const url = `${environment.apiUrl}preparePayment`;
    return this.http.post(url,cardData,{withCredentials:true});
  }

  getResult(token:string){
    const url = `${environment.apiUrl}payment/result/${token}`;
    return this.http.get<{data:Order}>(url,{withCredentials:true});
  }
  

}

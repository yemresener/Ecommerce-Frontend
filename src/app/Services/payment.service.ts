import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Order } from '../interfaces/order/order';
import { Installment } from '../interfaces/payment/installment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  preparePayment(cardData:any) : Observable<any> {
    const url = `${environment.apiUrl}preparePayment`;
    return this.http.post(url,cardData,{withCredentials:true});
  }

  paymentCard(cardData:any) : Observable<any> {
    const url = `${environment.apiUrl}payment/charge`;
    return this.http.post(url,cardData,{withCredentials:true});
  }

  paymentSavedCard(payload:{ saved_card_id:number,installment:number | 1}) : Observable<any> {
    const url = `${environment.apiUrl}payment/charge/savedCard`;
    return this.http.post(url,payload,{withCredentials:true});
  }



  getResult(token:string){
    const url = `${environment.apiUrl}payment/result/${token}`;
    return this.http.get<{data:Order}>(url,{withCredentials:true});
  }
  

  getInstallment(card_number:string){
    const url = `${environment.apiUrl}payment/installment`;
    return this.http.post<{installments:Installment[],card_type:string,
      card_family:string
    }>(url,{card_number},{withCredentials:true});
  }

}

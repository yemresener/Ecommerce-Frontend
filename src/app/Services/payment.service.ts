import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  preparePayment(address_id:number){
    const url = `${environment.apiUrl}preparePayment`;
    return this.http.post<{order_id:number,client_secret:string,total:number}>(url,{address_id:address_id},{withCredentials:true});
  }

  

}

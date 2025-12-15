import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {
  private stripe:Stripe | null=null;
  constructor(private http:HttpClient) { }

  async initStripe(publishableKey:string): Promise<Stripe | null> {
    if (!this.stripe) {
      this.stripe = await loadStripe(publishableKey);
    }
    return this.stripe; // <<-- burası lazım
  }

  async createPayment(): Promise<any> {
    return this.http.post('http://localhost:8000/api/preparePayment',{},{withCredentials:true}).toPromise();
  }

  async confirmPayment (clientSecret:string,cardElement:any,name:string){
    if(!this.stripe) throw new Error('Stripe bulunamadı!');
    return this.stripe.confirmCardPayment(clientSecret,{
      payment_method:{
        card:cardElement,
        billing_details:{name}
      }
    })
  }
}

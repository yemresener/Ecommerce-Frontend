import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';
import { error } from 'console';
import { CreditCardInterface } from '../../interfaces/payment/creditCard/credit-card-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private user = signal<User | null>(null);
  private savedCards = signal<CreditCardInterface[] | null>(null);

  getUser() { return this.user.asReadonly(); }
  getSavedCards() { return this.savedCards.asReadonly();}

  constructor() { }

  me() {
    const url = `${environment.apiUrl}me`;
    return this.http.get<User>(url, {withCredentials: true}).pipe(
      tap(res => {
        this.user.set(res);
      })
        
    );
  }

  login(body: {email: string, password: string}) {
    const url = `${environment.apiUrl}login`;
    return this.http.post(url, body, {withCredentials: true});
  }

  updateInfo(body:{name:string,surname:string}){
    const url = `${environment.apiUrl}user`;
    return this.http.put<{message:string}>(url,body,{withCredentials:true}).pipe(
      tap(()=>{
        this.user.update(u => u ? {...u, ...body} : u);
      }),

    )
  }

  sendOtp(body:{email:string}){
    const url = `${environment.apiUrl}email/sendOtp`;
    return this.http.post<{message:string,token:string}>(url,body,{withCredentials:true}).pipe(
      tap()
    )
  }

  confirmAndUpdateEmail(body:{token:string,code:string}){
    const url = `${environment.apiUrl}email/verifyOtp`;
    return this.http.post<{message:string,new_email:string}>(url,body,{withCredentials:true}).pipe(
      tap(res=>{
        this.user.update(u => u ? {...u, email: res.new_email} : u);
      })
    )
  }

  changePassword(body:{password_old:string,password_new:string}){
    const url = `${environment.apiUrl}password`;
    return this.http.patch<{message:string}>(url,body,{withCredentials:true});

  }
  

  callSavedCards(){
    const url = `${environment.apiUrl}card/saved`;
    return this.http.get<{data:CreditCardInterface[]}>(url,{withCredentials:true}).pipe(
      tap(res=>{
        this.savedCards.set(res.data);
      })
    )
  }

  updateCardToDefault(id:number){
    const url = `${environment.apiUrl}card/saved/${id}`;
    return this.http.put<{message:string,newDefault:number}>(url,{},{withCredentials:true}).pipe(
      tap(res => {
        this.savedCards.update(cards =>
          cards ? cards.map(a => ({ 
            ...a, 
            is_default: a.id === res.newDefault 
          })) : null
        );
      })
      
    )
  }

  deleteCard(saved_card_id:number){
    const url = `${environment.apiUrl}card/saved/${saved_card_id}`;
    return this.http.delete<{message:string}>(url,{withCredentials:true}).pipe(
      tap(()=>{
        this.savedCards.update(cards => cards? cards.filter(c => c.id !== saved_card_id) :null );
      })
    )

  }

}

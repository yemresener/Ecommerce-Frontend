import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartApiResponse } from '../interfaces/cart-api-response';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCount = signal<number | null>(null);
  
  getCartCount() { return this.cartCount.asReadonly();}
  
  constructor(private http:HttpClient) { }

  cart(){
    const url= `${environment.apiUrl}getUsersCart`;
    return this.http.get<CartApiResponse>(url,{withCredentials:true}).pipe(
      tap(res=>{
        this.cartCount.set(res.summary.productCount);  
      })
    )
  }

  callCartCount(){
    const url = `${environment.apiUrl}cart/count`;
    return this.http.get<{count:number}>(url,{withCredentials:true}).pipe(
      tap(res=>{
        this.cartCount.set(res.count)
      })
    )
  } 


  changeSelected(slug:string){
    const url = `${environment.apiUrl}changeSelected`;
    return this.http.post<{message:string}>(url,{advert_slug:slug},{withCredentials:true});
  }

  addCart(slug:string,quantity:number=1){
    const url = `${environment.apiUrl}storeCart`;
    return this.http.post<{message:string}>(url,{advert_slug:slug,quantity:quantity},{withCredentials:true});
  }

  deleteCart(slug:string, delete_all:boolean=false){
    const url = `${environment.apiUrl}deleteCart`;
    return this.http.post<{message:string}>(url,{advert_slug:slug,delete_all:delete_all},{withCredentials:true});
  }


}

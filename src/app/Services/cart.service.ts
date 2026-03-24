import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartApiResponse } from '../interfaces/cart-api-response';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  cart(){
    const url= `${environment.apiUrl}getUsersCart`;
    return this.http.get<CartApiResponse>(url,{withCredentials:true});
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserReviewService {

  constructor(private http:HttpClient) { }

  createReview(body:{rating:number,comment:string,order_item_id:number}){
    const url = `${environment.apiUrl}review`;
    return this.http.post<{message:string,rating:number}>(url,body,{withCredentials:true});
  }
}

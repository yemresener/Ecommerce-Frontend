import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advert } from '../interfaces/advert';
import { MiniAdvert } from '../interfaces/mini-advert';
import { ApiResponse } from '../interfaces/api-response';
import { Review } from '../interfaces/review';
import { ReviewResponse } from '../interfaces/review-response';

@Injectable({
  providedIn: 'root'
})

export class EachItemService {

  constructor(private http:HttpClient) { }

  getAdvert(slug:string){
    const url = `http://127.0.0.1:8000/api/advert/${slug}`;
    return this.http.get<{ data: Advert }>(url,{withCredentials:true});
  }

  popularAdvertsByCategory(category_id:number,product_id:number){
    const url = `http://127.0.0.1:8000/api/popularAdverts/${category_id}/${product_id}`;
    return this.http.get<ApiResponse<MiniAdvert[]>>(url,{withCredentials:true});
  }

  recoAdvertsByFeature(product_id:number){
    const url = `http://127.0.0.1:8000/api/recoAdverts/${product_id}`;
    return this.http.get<ApiResponse<MiniAdvert[]>>(url,{withCredentials:true});
  }

  getReviews(slug:string){
    const url = `http://127.0.0.1:8000/api/getReviewBySlug/${slug}`;
    return this.http.get<ApiResponse<ReviewResponse>>(url,{withCredentials:true});
  }
}

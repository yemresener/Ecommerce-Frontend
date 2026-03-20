import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advert } from '../interfaces/advert';
import { MiniAdvert } from '../interfaces/mini-advert';
import { ApiResponse } from '../interfaces/api-response';
import { Review } from '../interfaces/review';
import { ReviewResponse } from '../interfaces/review-response';
import { AdvertResponse } from '../interfaces/advert-response';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class EachItemService {

  constructor(private http:HttpClient) { }

  getAdvert(slug:string){
    const url = `${environment.apiUrl}advert/${slug}`;
    return this.http.get<ApiResponse<AdvertResponse>>(url,{withCredentials:true});
  }

  popularAdvertsByCategory(slug:string){
    const url = `${environment.apiUrl}popularAdverts/${slug}`;
    return this.http.get<ApiResponse<MiniAdvert[]>>(url,{withCredentials:true});
  }

  recoAdvertsByFeature(slug:string){
    const url = `${environment.apiUrl}recoAdverts/${slug}`;
    return this.http.get<ApiResponse<MiniAdvert[]>>(url,{withCredentials:true});
  }

  getReviews(slug:string){
    const url = `${environment.apiUrl}getReviewBySlug/${slug}`;
    return this.http.get<ApiResponse<ReviewResponse>>(url,{withCredentials:true});
  }
}

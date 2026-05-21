import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiniAdvert } from '../advert/interfaces/mini-advert';
import { ApiResponse } from '../../interfaces/api-response';
import { ReviewResponse } from '../review/interfaces/review-response';
import { AdvertResponse } from '../advert/interfaces/advert-response';
import { environment } from '../../../environments/environment';
import { ReviewStats } from '../review/interfaces/review-stats';
@Injectable({
  providedIn: 'root'
})

export class AdvertItemService {

  constructor(private http:HttpClient) { }

  getAdvert(slug:string){
    const url = `${environment.apiUrl}advert/${slug}`;
    return this.http.get<ApiResponse<AdvertResponse> & {stats:ReviewStats}>(url,{withCredentials:true});
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

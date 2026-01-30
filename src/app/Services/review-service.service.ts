import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { ReviewResponse } from '../interfaces/review-response';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  constructor(private http:HttpClient) { }

  getReview(slug:string){
    const url = `http://127.0.0.1:8000/api/getAdvertBySlug/${slug}`;
    return this.http.get<ApiResponse<ReviewResponse>>(url,{withCredentials:true});
  }

}

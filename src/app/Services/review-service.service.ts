import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { ReviewResponse } from '../interfaces/review-response';
import { FilterParams } from '../interfaces/filter-params';
import { Review } from '../interfaces/review';
@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  constructor(private http:HttpClient) { }

  getReview(slug:string){
    const url = `http://127.0.0.1:8000/api/reviewPage/${slug}`;
    return this.http.get<ApiResponse<ReviewResponse>>(url,{withCredentials:true});
  }


  

  filterReview(params:FilterParams){
    const url = `http://127.0.0.1:8000/api/filteredReview`;
    return this.http.get<ApiResponse<Review[]>>(url,{
      params: params as any, 
      withCredentials: true
    });
  }

}

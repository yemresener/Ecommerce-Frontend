import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { ReviewResponse } from '../interfaces/review-response';
import { FilterParams } from '../interfaces/filter-params';
import { Review } from '../interfaces/review';
import { environment } from '../../environments/environment';
import { tap,catchError  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  constructor(private http:HttpClient) { }

  private reviews = signal<Review[]>([]);
  private loading = signal<boolean>(false);

  getReviews() { return this.reviews.asReadonly();}
  getLoading() { return this.loading.asReadonly(); }



  review() {
    this.loading.set(true);
    const url = `${environment.apiUrl}review`;
    this.http.get<{data: Review[]}>(url, {withCredentials: true}).pipe(
      tap(res => {
        this.reviews.set(res.data);
        this.loading.set(false);

      }),
    ).subscribe({
      error: () => this.loading.set(false)
    });
  }



  deleteReview(id:number){
    const url = `${environment.apiUrl}review/${id}`;
    return this.http.delete<{message:string}>(url,{withCredentials:true}).pipe(
      tap(()=>{
        this.reviews.update(list => list.filter(r=>r.id !==id));
      })
    )
  }

  // EACH PAGE AND REVIEW PAGE 
  getReview(slug:string){
    const url = `${environment.apiUrl}reviewPage/${slug}`;
    return this.http.get<ApiResponse<ReviewResponse>>(url,{withCredentials:true});
  }

  filterReview(params:FilterParams){
    const url = `${environment.apiUrl}filteredReview`;
    return this.http.get<ApiResponse<Review[]>>(url,{
      params: params as any, 
      withCredentials: true
    });
  }

}

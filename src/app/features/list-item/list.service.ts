import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../interfaces/api-response';
import { CategoryFilters } from '../category/interfaces/category-filters';
import { environment } from '../../../environments/environment';
import { Category } from '../category/interfaces/category';
import { FilterParams } from '../../shared/filter/filter-params';
import { MiniAdvert } from '../advert/interfaces/mini-advert';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

  adverts(params:FilterParams){
    const url = `${environment.apiUrl}searchByCategory/${params.slug}`;
    return this.http.get<ApiResponse<MiniAdvert[]> & { category: Category }>(url,{
      params:params as any,
      withCredentials:true
    });
  }

  category(slug:string){
    const url = `${environment.apiUrl}getCategoryTree/${slug}`;
    return this.http.get<{filters:CategoryFilters}>(url);

  }

  search(params:FilterParams){
    const url = `${environment.apiUrl}search`;
    return this.http.get<ApiResponse<MiniAdvert[]>>(url,{
      params:params as any,
      withCredentials:true
    });

  }

}

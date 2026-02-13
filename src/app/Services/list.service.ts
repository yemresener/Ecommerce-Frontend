import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryAdvertResponse } from '../interfaces/category-advert-response';
import { MiniAdvert } from '../interfaces/mini-advert';
import { FilterParams } from '../interfaces/filter-params';
import { ApiResponse } from '../interfaces/api-response';
import { CategoryFilters } from '../interfaces/category-filters';



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

  adverts(params:FilterParams){
    const url = `http://127.0.0.1:8000/api/searchByCategory`;
    return this.http.get<ApiResponse<MiniAdvert[]>>(url,{
      params:params as any,
      withCredentials:true
    });
  }

  category(slug:string){
    const url = `http://127.0.0.1:8000/api/getCategoryTree/${slug}`;
    return this.http.get<{filters:CategoryFilters}>(url);

  }

}

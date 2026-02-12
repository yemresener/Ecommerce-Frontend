import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryAdvertResponse } from '../interfaces/category-advert-response';
import { MiniAdvert } from '../interfaces/mini-advert';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http:HttpClient) { }

  adverts(slug:string){
    const url = `http://127.0.0.1:8000/api/searchByCategory/${slug}`;
    return this.http.get<CategoryAdvertResponse<MiniAdvert[]>>(url);
  }

}

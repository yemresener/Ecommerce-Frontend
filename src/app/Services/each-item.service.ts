import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advert } from '../interfaces/advert';
@Injectable({
  providedIn: 'root'
})
export class EachItemService {

  constructor(private http:HttpClient) { }

  getAdvert(slug:string){
    const url = `http://127.0.0.1:8000/api/advert/${slug}`;
    return this.http.get<{ data: Advert }>(url,{withCredentials:true});
  }

}

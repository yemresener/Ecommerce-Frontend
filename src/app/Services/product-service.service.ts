import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(public http:HttpClient) { }

  createProduct(body:any){
    const url = `http://127.0.0.1:8000/api/storeProduct`;
    return this.http.post(url,body,{withCredentials:true});
  }
}

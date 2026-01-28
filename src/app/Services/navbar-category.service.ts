import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../interfaces/navbar';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})



export class NavbarCategoryService {

  constructor(private http:HttpClient) { }

  getCategories(): Observable<ApiResponse<Navbar[]>>{
    const url= `http://127.0.0.1:8000/api/getCategories`;
    return this.http.get<ApiResponse<Navbar[]>>(url);
  }
}

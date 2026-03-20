import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../interfaces/navbar';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})



export class NavbarCategoryService {

  constructor(private http:HttpClient) { }

  getCategories(): Observable<ApiResponse<Navbar[]>>{
    const url= `${environment.apiUrl}getCategories`;
    return this.http.get<ApiResponse<Navbar[]>>(url);
  }
}

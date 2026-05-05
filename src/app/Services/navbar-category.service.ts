import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Navbar } from '../interfaces/navbar';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { MiniAdvert } from '../interfaces/mini-advert';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class NavbarCategoryService {
  private categories = signal<Navbar[] | undefined>(undefined);

  getNavbarCategories() {return this.categories.asReadonly()}
  constructor(private http:HttpClient) { }

  getCategories(): Observable<ApiResponse<Navbar[]>>{
    const url= `${environment.apiUrl}categories`;
    return this.http.get<ApiResponse<Navbar[]>>(url).pipe(
      tap(res=>{
        this.categories.set(res.data)
      })
    );
  }


  search(q:string){
    const url = `${environment.apiUrl}quickSearch`;
    return this.http.get<{data:MiniAdvert[]}>(url,{
      params: { q }
    })

  }
}

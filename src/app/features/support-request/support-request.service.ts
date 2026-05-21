import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SupportRequestInterface } from './support-request-interface';
@Injectable({
  providedIn: 'root'
})
export class SupportRequestService {

  constructor(private http:HttpClient) { }

  createRequest(body:SupportRequestInterface){
    const url = `${environment.apiUrl}supportRequest`;
    return this.http.post<{message:string}>(url,body,{withCredentials:true})
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(body:{email:string,password:string}){
    const url = `${environment.apiUrl}login`;
    return this.http.post(url,body,{withCredentials:true});
  }
  
}

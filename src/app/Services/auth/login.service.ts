import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(body:{email:string,password:string}){
    const url = `http://localhost:8000/api/login`;
    return this.http.post(url,body,{withCredentials:true});
  }
}

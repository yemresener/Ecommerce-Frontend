import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtpApiResponse } from '../../interfaces/otp-api-response';
import { CreateAcc } from '../../interfaces/register/create-acc';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  public sendOtp(email:string) {
    const url = `${environment.apiUrl}sendOtp`;
    return this.http.post<OtpApiResponse>(url,{email:email},{withCredentials:true});
  }

  public verifyOtp(body:{code:number,token:string}){
    const url = `${environment.apiUrl}verifyOtp`;
    return this.http.post<OtpApiResponse>(url,body,{withCredentials:true});
  }

  public register(body:CreateAcc){
    const url = `${environment.apiUrl}register`;
    return this.http.post(url,body,{withCredentials:true});
    
  }

}

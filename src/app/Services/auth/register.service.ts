import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtpApiResponse } from '../../interfaces/otp-api-response';
import { CreateAcc } from '../../interfaces/register/create-acc';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  public sendOtp(email:string) {
    const url = `http://127.0.0.1:8000/api/sendOtp`;
    return this.http.post<OtpApiResponse>(url,{email:email},{withCredentials:true});
  }

  public verifyOtp(body:{code:number,token:string}){
    const url = `http://127.0.0.1:8000/api/verifyOtp`;
    return this.http.post<OtpApiResponse>(url,body,{withCredentials:true});
  }

  public register(body:CreateAcc){
    const url = `http://127.0.0.1:8000/api/register`;
    return this.http.post(url,body,{withCredentials:true});
    
  }

}

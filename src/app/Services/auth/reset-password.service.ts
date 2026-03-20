import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtpApiResponse } from '../../interfaces/otp-api-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }

  sendOtp(email:string){
    const url =`${environment.apiUrl}resetPasswordOtp`;
    return this.http.post<OtpApiResponse>(url,{email:email},{withCredentials:true})
  }

  verifyOtp(body:{code:number,token:string}){
    const url =`${environment.apiUrl}verifyPasswordOtp`;
    return this.http.post<OtpApiResponse>(url,body,{withCredentials:true})
  }

  createNewPass(body:{passwordFirst:string,passwordSecond:string,token:string}){
    const url =`${environment.apiUrl}resetPassword`;
    return this.http.post(url,body,{withCredentials:true})
  }


}

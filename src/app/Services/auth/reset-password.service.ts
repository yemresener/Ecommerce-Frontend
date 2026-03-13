import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OtpApiResponse } from '../../interfaces/otp-api-response';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }

  sendOtp(email:string){
    const url =`http://127.0.0.1:8000/api/resetPasswordOtp`;
    return this.http.post<OtpApiResponse>(url,{email:email},{withCredentials:true})
  }

  verifyOtp(body:{code:number,token:string}){
    const url =`http://127.0.0.1:8000/api/verifyPasswordOtp`;
    return this.http.post<OtpApiResponse>(url,body,{withCredentials:true})
  }

  createNewPass(body:{passwordFirst:string,passwordSecond:string,token:string}){
    const url =`http://127.0.0.1:8000/api/resetPassword`;
    return this.http.post(url,body,{withCredentials:true})
  }


}

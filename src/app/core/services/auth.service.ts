import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,finalize } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private user = signal<User | null>(null);

  getUser() { return this.user.asReadonly(); }

  constructor() { }

  me() {
    const url = `${environment.apiUrl}me`;
    return this.http.get<User>(url, {withCredentials: true}).pipe(
      tap(res => {
        this.user.set(res);
      })
        
    );
  }

  login(body: {email: string, password: string}) {
    const url = `${environment.apiUrl}login`;
    return this.http.post(url, body, {withCredentials: true});
  }

  updateInfo(body:{name:string,surname:string}){
    const url = `${environment.apiUrl}user`;
    return this.http.put<{message:string}>(url,body,{withCredentials:true}).pipe(
      tap(()=>{
        this.user.update(u => u ? {...u, ...body} : u);
      }),

    )
  }

  sendOtp(body:{email:string}){
    const url = `${environment.apiUrl}email/sendOtp`;
    return this.http.post<{message:string,token:string}>(url,body,{withCredentials:true}).pipe(
      tap()
    )
  }

  confirmAndUpdateEmail(body:{token:string,code:string}){
    const url = `${environment.apiUrl}email/verifyOtp`;
    return this.http.post<{message:string,new_email:string}>(url,body,{withCredentials:true}).pipe(
      tap(res=>{
        this.user.update(u => u ? {...u, email: res.new_email} : u);
      })
    )
  }
  

}

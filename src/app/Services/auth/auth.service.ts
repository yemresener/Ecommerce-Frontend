import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = signal<boolean>(false);
  private user = signal<any>(null);

  isLoggedIn() { return this.loggedIn.asReadonly()}
  getUser() { return this.user.asReadonly()}

  constructor(private http: HttpClient) {}

  checkAuth(){
    const url = `${environment.apiUrl}me`;
    return this.http.get<any>(url,{withCredentials:true}).pipe(
      tap((res)=>{
        console.log('APİ CALL ATILDI')
        this.loggedIn.set(true);
        this.user.set(res)
      }),
      catchError(() => {
        this.loggedIn.set(false);
        return of(null);
      })
    )
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.set(value);
  }

}

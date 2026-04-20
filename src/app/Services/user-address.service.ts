import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddressInterface } from '../interfaces/address-interface';
import { tap,catchError  } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserAddressService {
  private addresses = signal<AddressInterface[]>([]);
  private loading = signal<boolean>(false);

  getAddresses() { return this.addresses.asReadonly(); }
  getLoading() { return this.loading.asReadonly(); }

  constructor(private http:HttpClient) { }

  loadAddresses() {
    this.loading.set(true);
    this.http.get<{ data: AddressInterface[] }>(`${environment.apiUrl}addresses`, { withCredentials: true }).subscribe({
      next: (res) => {
        this.addresses.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    });

  }
  
  createAddress(body:AddressInterface){
    return this.http.post<any>(`${environment.apiUrl}addresses`, body,{withCredentials:true}).pipe(
      tap(res => {
        this.addresses.update(list => [
          ...list.map(a => ({ ...a, is_default: false })),
          res.data
        ]);
      })
    );
  }

  updateAddress(body:AddressInterface){
    const previous = this.addresses();
    this.addresses.update(list=>
      list.map(a=>a.id === body.id ? { ...body, is_default: true } : { ...a, is_default: false })
    );
    return this.http.put<any>(`${environment.apiUrl}addresses/${body.id}`,body,{withCredentials:true}).pipe(tap(res=>{
    },
    catchError(err => {
      this.addresses.set(previous);
      throw err;
    })
    ))
  }


  updateToDefault(address_id: number) {
    const previous = this.addresses();

    return this.http.patch(`${environment.apiUrl}addresses/${address_id}/default`, {}, {withCredentials: true}).pipe(
      tap(() => {
        this.addresses.update(list =>
          list.map(a => ({ ...a, is_default: a.id === address_id }))
        );
      },catchError(err => {
        this.addresses.set(previous);
        throw err;
      }))
    );
  }

  deleteAddress(address_id:number){
    return this.http.delete<{new_default_id:number}>(`${environment.apiUrl}addresses/${address_id}`, {withCredentials: true}).pipe(
      tap((res)=>{
        this.addresses.update(list =>{
          const filtered = list.filter(a=> a.id !== address_id);

          if(res.new_default_id){
            console.log('UĞRADI KANK')
            return filtered.map(a=>({
              ...a,
              is_default: a.id === res.new_default_id
            }))
          }
          return filtered;
        })
      }))
    }




}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AddressInterface } from '../interfaces/address-interface';
@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(private http:HttpClient) { }

  getAllAddress(){
    const url = `${environment.apiUrl}getAddress`;
    return this.http.get<{data:AddressInterface[]}>(url,{withCredentials:true});
  }

  updateToDefault(address_id:number){
    const url = `${environment.apiUrl}updateAddress/${address_id}`;
    return this.http.put(url,{is_default:true},{withCredentials:true});
  }

  updateAddress(body:AddressInterface){
    const url = `${environment.apiUrl}updateAddress/${body.id}`;
    return this.http.put(url,body,{withCredentials:true});
  }


}

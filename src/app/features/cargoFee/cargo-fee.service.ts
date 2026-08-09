import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { CargoFee } from './cargo-fee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CargoFeeService {
  private cargoFee = signal<CargoFee | null>(null);
  constructor(private http:HttpClient) { }

  loadCargoFee(){
    this.http.get<{data:CargoFee}>(`${environment.apiUrl}shipping/prices`,{withCredentials:true},).
    subscribe({
      next:(res)=>{
        this.cargoFee.set(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}

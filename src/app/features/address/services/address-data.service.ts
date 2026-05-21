import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AddressDataService {

  constructor(private http: HttpClient) { }

  getProvinces() {
    return this.http.get<any[]>('assets/address/il/il.json').pipe(
      map(data => data.map(il => ({ id: il.id, name: il.name })))
    );
  }

  getDistricts(provinceId: number) {
    return this.http.get<any[]>('assets/address/ilce/ilce.json').pipe(
      map(data => {
        const il = data.find(item => item.il_id === provinceId);
        return il ? il.ilceler.map((ilce: any) => ({ id: ilce.id, name: ilce.name })) : [];
      })
    );
  }
}

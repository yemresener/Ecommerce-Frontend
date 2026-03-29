import { Component } from '@angular/core';
import { AddressDataService } from '../../../Services/address-data.service';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../address-card/address-card.component';
@Component({
  selector: 'app-address',
  imports: [CommonModule,AddressCardComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  constructor(private addressDataService:AddressDataService){}

  provinces: any[] = [];
  districts: any[] = [];
  
  ngOnInit() {
    this.addressDataService.getProvinces().subscribe(data => {
      this.provinces = data;
    });
  }
  
  onProvinceChange(provinceId: number) {
    this.districts = [];
    this.addressDataService.getDistricts(provinceId).subscribe(data => {
      this.districts = data;
    });
  }

  onSubmit(event:any){
    console.log(event)
  }
}

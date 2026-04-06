import { Component,Output,EventEmitter } from '@angular/core';
import { AddressDataService } from '../../../Services/address-data.service';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../address-card/address-card.component';
import { UserAddressService } from '../../../Services/user-address.service';
import { AddressInterface } from '../../../interfaces/address-interface';
import { BrowserAware } from '../../base/browser-aware';
import { FullpageLoaderComponent } from '../../fullpage-loader/fullpage-loader.component';
@Component({
  selector: 'app-address',
  imports: [CommonModule,AddressCardComponent,FullpageLoaderComponent],
  templateUrl: './address.component.html',
  host: { ngSkipHydration: 'true' }, // ssr 

  styleUrl: './address.component.css'
})
export class AddressComponent extends BrowserAware{
  constructor(private service:UserAddressService
    ,private addressDataService:AddressDataService){super()}
    @Output() addressSelected = new EventEmitter<AddressInterface>();



  provinces: any[] = [];
  districts: any[] = [];
  loading:boolean =false;

  ngOnInit() {
    this.addressDataService.getProvinces().subscribe(data => {
      this.provinces = data;
    });
    
    if(this.isBrowser()){
      this.getAllAddress();

    }
  }
  
  onProvinceChange(provinceId: number) {
    this.districts = [];
    this.addressDataService.getDistricts(provinceId).subscribe(data => {
      this.districts = data;
    });
  }

  onSubmit(event:any){
    console.log(event);
    if(event.mode === 'edit')this.updateAddress(event.data);
  }

  address!:AddressInterface[];

  getAllAddress(){
    this.service.getAllAddress().subscribe({
      next:(res)=>{
        console.log('salamlar',res);
        this.address=res.data;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  updateToDefault(address_id:number){
    this.loading=true;
    const previous = this.address;
    this.address = this.address?.map(a=>({
      ...a,
      is_default:a.id === address_id
    }))
    this.toggleModal();

    this.service.updateToDefault(address_id).subscribe({
      next:(res)=>{
        console.log(res,'RESPONSE');
        const selected = this.address?.find(a => a.id === address_id);
        if(selected) this.addressSelected.emit(selected);
        this.loading=false;
      },
      error:(err)=> {
        console.log(err);
        this.address=previous;
        this.loading=false;

      },
    })
  }
  

  updateAddress(body:AddressInterface){
    console.log(body, 'GELEN')
    this.loading=true;
    const previous = this.address;
  
    this.address = this.address?.map(a => 
      a.id === body.id ? { ...body, is_default: true } : { ...a, is_default: false }
    );
    
    this.service.updateAddress(body).subscribe({
      next:(res)=>{
        console.log(res);

        this.addressSelected.emit({ ...body });
        this.loading=false;
        this.toggleModal();

      },
      error:(err)=>{
        console.log(err)
        this.address=previous;
        this.loading=false;
      }
    })
  }


  showModal:boolean=false;
  formMode:null | 'create' | 'edit'=null
  toggleModal(){
    this.showModal=!this.showModal;
    this.formMode=null;
    console.log('ça',this.showModal)
    console.log(this.formMode,'FORM MODE')

  }

}

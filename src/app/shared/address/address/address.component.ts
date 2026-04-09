import { Component,Output,EventEmitter,Signal,inject  } from '@angular/core';
import { AddressDataService } from '../../../Services/address-data.service';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../address-card/address-card.component';
import { UserAddressService } from '../../../Services/user-address.service';
import { AddressInterface } from '../../../interfaces/address-interface';
import { BrowserAware } from '../../base/browser-aware';
import { FullpageLoaderComponent } from '../../fullpage-loader/fullpage-loader.component';
import { MainToastComponent } from '../../components/toast/main-toast/main-toast.component';
@Component({
  selector: 'app-address',
  imports: [CommonModule,AddressCardComponent,FullpageLoaderComponent,
    MainToastComponent
  ],
  templateUrl: './address.component.html',
  host: { ngSkipHydration: 'true' }, // ssr 

  styleUrl: './address.component.css'
})
export class AddressComponent extends BrowserAware{
  private service = inject(UserAddressService);
  address = this.service.getAddresses();
  
  constructor(private addressDataService:AddressDataService){
      super()}
    @Output() addressSelected = new EventEmitter<AddressInterface>();

  

  provinces: any[] = [];
  districts: any[] = [];
  loading:boolean =false;
  protected readonly getAddressesLoading = this.service.getLoading();

  ngOnInit() {
    this.addressDataService.getProvinces().subscribe(data => {
      this.provinces = data;
    });
    

  }
  
  message:string='';
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  onProvinceChange(provinceId: number) {
    this.districts = [];
    this.addressDataService.getDistricts(provinceId).subscribe(data => {
      this.districts = data;
    });
  }

  onSubmit(event:any){
    console.log(event);
  //  if(event.mode === 'edit')this.updateAddress(event.data);
    
  }

  updateAddress(body:AddressInterface){
    this.loading=true;
    this.message='';

    this.service.updateAddress(body).subscribe({
      next:(res)=>{
        console.log(res);

        this.addressSelected.emit({ ...body,is_default: true });
        this.loading=false;
        this.toggleModal();
        this.message='Adres güncelleme başarılı';
        this.status='success';
      },
      error:(err)=>{
        console.log(err)
        this.message=err.error.message;
        this.status='error';
        this.loading=false;
      }
    })
  }

  createAddress(body:AddressInterface){
    this.loading = true;
    this.message='';
    //return;
    this.service.createAddress(body).subscribe({
      next:(res)=>{
        console.log(res);
        this.addressSelected.emit({ ...body });

        this.loading = false;
        this.toggleModal();
        this.message='Yeni adres eklendi.';
        this.status='success';
      },
      error:(err)=>{
        this.loading = false;
        console.log(err);
        this.message=err.error.message;
        this.status='error';
      }
    })
  }

  updateToDefault(address_id:number){
    this.loading=true;


    this.service.updateToDefault(address_id).subscribe({
      next:(res)=>{
        console.log(res,'RESPONSE');
        const selected = this.address()?.find(a => a.id === address_id);
        if(selected) this.addressSelected.emit(selected);
        this.toggleModal();

        this.loading=false;
        this.message='Adres güncelleme başarılı';
        this.status='success';
      },
      error:(err)=> {
        console.log(err);
        this.loading=false;
        this.message=err.error.message;
        this.status='error';
      },
    })
  }

  deleteAddress(address_id:number){
    this.loading=true;
    
    this.service.deleteAddress(address_id).subscribe({
      next:(res)=>{
        console.log(res);
        
        const newDefault = this.address()?.find(a => a.is_default);
        if (newDefault) this.addressSelected.emit(newDefault);
        this.addressSelected.emit(undefined);
        this.loading = false;
        this.message='Adres silindi.';
        this.status='success';
      },
      error:(err)=> {
        console.log(err);
        this.loading=false;
        this.status='error';
        this.loading=false;
      }
    })
  }

  showModal:boolean=false;
  formMode:null | 'create' | 'edit'=null
  toggleModal(emptyAddress?:boolean){
    this.showModal=!this.showModal;
    if(emptyAddress){
      if(!this.service.getAddresses()?.length){
        this.formMode='create';
        return
      }
    }
    if (this.showModal && !this.address()?.length) {
      this.service.loadAddresses();
      console.log('SALAMLAR BURADAYIz')
      
    }
    this.formMode=null;
 

  }

}

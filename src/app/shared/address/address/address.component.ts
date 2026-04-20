import { Component,Output,EventEmitter,Signal,inject,Input  } from '@angular/core';
import { AddressDataService } from '../../../Services/address-data.service';
import { CommonModule } from '@angular/common';
import { AddressCardComponent } from '../address-card/address-card.component';
import { UserAddressService } from '../../../Services/user-address.service';
import { AddressInterface } from '../../../interfaces/address-interface';
import { BrowserAware } from '../../base/browser-aware';
import { FullpageLoaderComponent } from '../../fullpage-loader/fullpage-loader.component';
import { MainToastComponent } from '../../components/toast/main-toast/main-toast.component';
import { AddressModalComponent } from '../../../address/address-modal/address-modal.component';
import { AddressListComponent } from '../../../address/address-list/address-list.component';
import { AddressDashboardWidgetComponent } from '../../../address/address-dashboard-widget/address-dashboard-widget.component';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-address',
  imports: [CommonModule,AddressCardComponent,FullpageLoaderComponent,DeleteConfirmComponent,
    MainToastComponent,AddressModalComponent,AddressListComponent,AddressDashboardWidgetComponent
  ],
  templateUrl: './address.component.html',
  host: { ngSkipHydration: 'true' }, // ssr 

  styleUrl: './address.component.css'
})
export class AddressComponent extends BrowserAware{
  private addressService = inject(UserAddressService);
  private addressDataService = inject(AddressDataService);
  
  constructor(){super()}

    @Input() mode: 'modal' | 'dashboard' = 'modal';
    @Output() addressSelected = new EventEmitter<AddressInterface>();

    addresses = this.addressService.getAddresses();
    loading = this.addressService.getLoading();
  
    showModal = false;
    actionLoading = false;
    message = '';
    status: 'success' | 'error' | 'warning' | 'info' = 'success';

    provinces: any[] = [];
    districts: any[] = [];

    ngOnInit() {
      this.addressDataService.getProvinces().subscribe(data => {
        this.provinces = data;
      });

      if (this.mode === 'dashboard' && !this.addresses()?.length) {
        this.addressService.loadAddresses();
      }
      }
      


  onProvinceChange(provinceId: number) {
    setTimeout(() => {
      this.districts = [];
      this.addressDataService.getDistricts(provinceId).subscribe(data => {
        this.districts = data;
      });
    });
  }

  onSubmit(event:any){
    console.log(event);
  //  if(event.mode === 'edit')this.updateAddress(event.data);
    
  }

  updateAddress(body:AddressInterface){
    this.actionLoading = true;
    this.message='';

    this.addressService.updateAddress(body).subscribe({
      next:(res)=>{
        console.log(res);

        this.actionLoading=false;
        this.showModal = false;
        this.message='Adres güncelleme başarılı';
        this.status='success';
        this.addressSelected.emit({ ...body,is_default: true });

      },
      error:(err)=>{
        console.log(err)
        this.message=err.error.message;
        this.status='error';
        this.actionLoading = false;
      }
    })
  }

  createAddress(body:AddressInterface){
    this.actionLoading = true;
    this.message='';
    //return;
    this.addressService.createAddress(body).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.showModal = false;
        this.actionLoading = false;
        this.message='Yeni adres eklendi.';
        this.status='success';
        this.addressSelected.emit({ ...body });

      },
      error:(err)=>{
        this.actionLoading = false;
        console.log(err);
        this.message=err.error.message;
        this.status='error';
      }
    })
  }

  updateToDefault(address_id:number){
    this.actionLoading = true;


    this.addressService.updateToDefault(address_id).subscribe({
      next:(res)=>{
        console.log(res,'RESPONSE');

        const selected = this.addresses()?.find(a => a.id === address_id);
        if(selected) this.addressSelected.emit(selected);

        this.actionLoading = false;
        this.message = 'Varsayılan adres güncellendi.';
        this.status = 'success';
      },
      error:(err)=> {
        console.log(err);
        this.actionLoading = false;
        this.message=err.error.message;
        this.status='error';
      },
    })
  }

  deleteAddress(address_id:number){
    this.actionLoading=true;
    
    this.addressService.deleteAddress(address_id).subscribe({
      next:(res)=>{
        console.log(res);

        this.actionLoading = false;
        this.message = 'Adres silindi.';
        this.status = 'success';

        const newDefault = this.addresses()?.find(a => a.is_default);
        if (newDefault) {
          this.addressSelected.emit(newDefault);
          return;
        }
        this.addressSelected.emit(undefined);
 
      },
      error:(err)=> {
        console.log(err);
        this.actionLoading = false;
        this.status='error';
      }
    })
  }
  initialFormMode:'edit' | 'create' | null = null;

  openModal(mode?:'create') {
    console.log('ÇALKIŞTI',mode)
    this.showModal = true;
    this.initialFormMode = mode ?? null;

    if(!this.addresses()?.length && this.initialFormMode!=='create'){
      this.addressService.loadAddresses();
    }
  }



  initialAddress: AddressInterface | null = null;

  onEditRequest(address: AddressInterface) {
    console.log(address,'GELEN ADRES')
    this.initialAddress = address;
    this.initialFormMode = 'edit';
    this.showModal = true;
  }


  showDeleteConfirm=false;
  confirmMessage = 'Bu adresi silmek istediğine emin misin?';
  pendingDeleteId?: number;

  onDeleteConfirmRequest(id: number) {
    this.pendingDeleteId = id;
    this.showDeleteConfirm = true;
  }

  onDeleteRequest() {
    this.showDeleteConfirm=false;
    if(this.pendingDeleteId){

    this.deleteAddress(this.pendingDeleteId); 
    }
  }

  onDeleteCancel() {
    this.pendingDeleteId = undefined;
    this.showDeleteConfirm = false;
  }

}

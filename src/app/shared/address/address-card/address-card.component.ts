import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-address-card',
  imports: [CommonModule,FormsModule,NgSelectModule,NgxMaskDirective,],
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.css',
  providers: [provideNgxMask()]
})

export class AddressCardComponent {
  @Input() open:boolean = true;
  @Input() showForm:boolean = false;

  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Output() provinceChanged = new EventEmitter<number>();
  @Output() formSubmit = new EventEmitter<any>();

  formMode:null | 'create' | 'edit'=null;
  selectedAddress:any = null;

  form = {
    full_name: '',
    phone: '',
    province_id: null as number | null,
    district_id: null as number | null,
    address_line: ''
  };

  openCreate(){
    this.form = { full_name: '', phone: '', province_id: null, district_id: null, address_line: '' };
    this.formMode = 'create';
  }

  openEdit(address:any){
    this.selectedAddress=address;
    this.form = {
      full_name: address.full_name,
      phone: address.phone,
      province_id: address.province_id,
      district_id: address.district_id,
      address_line: address.address_line
    }
    this.districts = [];
    this.provinceChanged.emit(address.province_id);

    this.formMode = 'edit';
  }


  onProvinceSelect(selected: any) {
    const id = selected?.id;
    this.form.province_id = id;
    this.form.district_id = null;
    this.provinceChanged.emit(id);
  }

  onSubmit() {
    if (this.formMode === 'create') {
      this.formSubmit.emit({ mode: 'create', data: this.form });
    } else {
      this.formSubmit.emit({ mode: 'edit', data: this.form, id: this.selectedAddress.id });
    }
  }



  

}

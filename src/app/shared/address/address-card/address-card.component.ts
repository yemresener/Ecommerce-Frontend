import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AddressInterface } from '../../../interfaces/address-interface';

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
  @Input() formMode:null | 'create' | 'edit'=null;


  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Input() address?:AddressInterface[];

  @Output() provinceChanged = new EventEmitter<number>();
  @Output() formSubmit = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();
  @Output() updateToDefault = new EventEmitter<number>();
  @Output() updateAddress = new EventEmitter<AddressInterface>();
  @Output() formModeChange = new EventEmitter<null | 'create' | 'edit'>();


  ngOnInit(): void {
    console.log('sa',this.address);
  }
  selectedAddress:any = null;

  form: AddressInterface = {
    full_name: '',
    phone_number: '',
    address_type: '',
    address_line: '',
    city_id: 0,
    city: '',
    state_id: 0,
    state: '',
    neighbourhood: '',
    postal_code: '',
    is_default: true,
  }

  openCreate(){
    this.form = {    full_name: '',
      phone_number: '',
      address_type: '',
      address_line: '',
      city_id: 0,
      city: '',
      state_id: 0,
      state: '',
      neighbourhood: '',
      postal_code: '',
      is_default: true,
    };

    this.formModeChange.emit('create');
  }

  openEdit(address:AddressInterface){
    this.selectedAddress=address;
    this.form=address;
    this.districts = [];
    console.log(this.form);
    this.provinceChanged.emit(address.city_id);

    this.formModeChange.emit('edit');
  }


  onProvinceSelect(selected: any) {
    const id = selected?.id;
    this.form.city_id = id;
    this.form.city = selected?.name;
    this.form.state_id = 0;
    this.form.state = '';
    this.provinceChanged.emit(id);
  }
  onDistrictSelect(selected: any) {
    this.form.state_id = selected?.id;
    this.form.state = selected?.name;
  }
  onSubmit() {
    if (this.formMode === 'create') {
      this.formSubmit.emit({ mode: 'create', data: this.form });
    } else {
      this.formSubmit.emit({ mode: 'edit', data: this.form, id: this.selectedAddress.id });
    }
  }

  makeDefault(address:AddressInterface){

    this.updateToDefault.emit(address.id);
  }

  update(address:AddressInterface){
    this.updateAddress.emit(address);

  }


  

}

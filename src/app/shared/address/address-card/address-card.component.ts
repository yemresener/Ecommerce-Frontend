import { Component,Input,Output,EventEmitter,Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AddressInterface } from '../../../interfaces/address-interface';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-address-card',
  imports: [CommonModule,FormsModule,NgSelectModule,NgxMaskDirective,ReactiveFormsModule
    ,DeleteConfirmComponent
  ],
  templateUrl: './address-card.component.html',

  styleUrl: './address-card.component.css',
  providers: [provideNgxMask()]
})

export class AddressCardComponent {
  form:FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(4)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^(\+90|0)?5[0-9]{9}$/)]],
      address_type: [{value:'home'}],
      address_line: ['', [Validators.required, Validators.minLength(10)]],
      city_id: [null, [Validators.required, Validators.min(1)]],
      city: [''],
      state_id: [{value:null,disabled:true}, [Validators.required, Validators.min(1)]],
      state: [''],
      neighbourhood: [''],
      postal_code: [''],
      is_default: [true],
    });
  }
  get full_name() { return this.form.get('full_name'); }
  get phone_number() { return this.form.get('phone_number'); }
  get address_line() { return this.form.get('address_line'); }
  get city_id() { return this.form.get('city_id'); }
  get state_id() { return this.form.get('state_id'); }

  @Input() open:boolean = false;
  @Input() showForm:boolean = false;
  @Input() formMode:null | 'create' | 'edit'=null;


  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Input() address!:Signal<AddressInterface[]>;

  @Output() provinceChanged = new EventEmitter<number>();
  @Output() formSubmit = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();
  @Output() updateToDefault = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  @Output() updateAddress = new EventEmitter<AddressInterface>();
  @Output() formModeChange = new EventEmitter<null | 'create' | 'edit'>();
  @Output() createAddress = new EventEmitter<AddressInterface>();


  ngOnInit(): void {
  }
  selectedAddress:any = null;
  
  /*
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
  */

  openCreate(){
    this.formReset();
    this.form.get('state_id')?.disable();
    

    this.formModeChange.emit('create');
  }

  openEdit(address:AddressInterface){
    this.selectedAddress=address;
    this.form.patchValue(address);
    this.districts = [];
    console.log(this.form.value);
    this.state_id?.enable();
    this.provinceChanged.emit(address.city_id);

    this.formModeChange.emit('edit');
  }


  onProvinceSelect(selected: any) {

    this.form.patchValue({ city_id: selected?.id, city: selected?.name, state_id: null, state: '' });
    this.state_id?.enable();
    this.provinceChanged.emit(selected?.id);
  }

  onDistrictSelect(selected: any) {
    this.form.patchValue({ state_id: selected?.id, state: selected?.name });
  }

  onSubmit() {
    console.log('SALAMLAR')
    console.log(this.form.value,'VALUE');
    if(this.form.invalid){
      console.log('invalid geliyor')

      this.form.markAllAsTouched();
      if(this.state_id?.disable){
      console.log('disable  geliyor')

        this.state_id.enable();
        this.state_id.markAsTouched();
      }
      return;
    }
    console.log('SALAMLAR')
    if (this.formMode === 'create') {
      this.createAddress.emit(this.form.value );
    } else {
      this.updateAddress.emit({ ...this.form.value, id: this.selectedAddress.id });
    }
  }

  makeDefault(address:AddressInterface){

    this.updateToDefault.emit(address.id);
  }

  showDeleteConfirm=false;
  pendingDeleteId?:number;
  confirmMessage='';
  confirmDelete(address_id?:number){
    this.showDeleteConfirm=true;
    this.confirmMessage='Bu adresi silmek istediğine emin misin?';
    this.pendingDeleteId=address_id;
  }
  onDeleteConfirm(){
    if(this.pendingDeleteId){
      this.deleteAddress(this.pendingDeleteId);
    }
    this.showDeleteConfirm=false;

  }
  onDeleteCancel(){
    this.pendingDeleteId=undefined;
    this.showDeleteConfirm=false;
  }


  deleteAddress(address_id:number){
    this.delete.emit(address_id);
  }


  update(address:AddressInterface){
    this.updateAddress.emit(address);

  }

  formReset(){
    this.form.reset({
      full_name: '', phone_number: '', address_type: 'Ev',
      address_line: '', city_id: null, city: '', state_id: null,
      state: '', neighbourhood: '', postal_code: '', is_default: true,
    });
    
  }
  

}

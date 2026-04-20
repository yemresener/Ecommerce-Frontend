import { Component,Input,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskDirective } from 'ngx-mask';
import { AddressInterface } from '../../interfaces/address-interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, NgxMaskDirective, FormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() address: AddressInterface | null = null; // edit modunda dolu gelir
  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Input() loading: boolean = false;

  @Output() submitted = new EventEmitter<AddressInterface>();
  @Output() provinceChanged = new EventEmitter<number>(); // smart il değişince ilçeleri çeker
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(4)]],
      phone_number: ['', [Validators.required, Validators.pattern(/^(\+90|0)?5[0-9]{9}$/)]],
      address_type: ['Ev'],
      address_line: ['', [Validators.required, Validators.minLength(10)]],
      city_id: [null, [Validators.required, Validators.min(1)]],
      city: [''],
      state_id: [{ value: null, disabled: true }, [Validators.required, Validators.min(1)]],
      state: [''],
      neighbourhood: [''],
      postal_code: [''],
      is_default: [true],
    });
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.address) {
      this.form.patchValue(this.address);
      this.form.get('state_id')?.enable();
      this.provinceChanged.emit(this.address.city_id); // ilçeleri yükle
    }
  }

  get full_name() { return this.form.get('full_name'); }
  get phone_number() { return this.form.get('phone_number'); }
  get address_line() { return this.form.get('address_line'); }
  get city_id() { return this.form.get('city_id'); }
  get state_id() { return this.form.get('state_id'); }

  onProvinceSelect(selected: any) {
    this.form.patchValue({ city_id: selected?.id, city: selected?.name, state_id: null, state: '' });
    this.form.get('state_id')?.enable();
    this.provinceChanged.emit(selected?.id);
  }

  onDistrictSelect(selected: any) {
    this.form.patchValue({ state_id: selected?.id, state: selected?.name });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.get('state_id')?.enable();
      this.form.get('state_id')?.markAsTouched();
      return;
    }
    const value = this.mode === 'edit'
      ? { ...this.form.value, id: this.address?.id }
      : this.form.value;

    this.submitted.emit(value);
  }


}

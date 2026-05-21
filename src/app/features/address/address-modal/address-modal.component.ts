import { Component,Input,Output,EventEmitter,SimpleChanges } from '@angular/core';
import { AddressInterface } from '../address-interface';
import { AddressListComponent } from '../address-list/address-list.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CommonModule } from '@angular/common';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-address-modal',
  imports: [AddressListComponent,AddressFormComponent,CommonModule,DeleteConfirmComponent],
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.css'
})
export class AddressModalComponent {
  @Input() open: boolean = false;
  @Input() addresses: AddressInterface[] = [];
  @Input() provinces: any[] = [];
  @Input() districts: any[] = [];
  @Input() loading: boolean = false;
  @Input() initialFormMode:'edit' | 'create' | null = null;
  @Input() initialAddress: AddressInterface | null = null;
  @Input() showBackButton: boolean = true;

  @Output() close = new EventEmitter<void>();
  @Output() create = new EventEmitter<AddressInterface>();
  @Output() update = new EventEmitter<AddressInterface>();
  @Output() delete = new EventEmitter<number>();
  @Output() makeDefault = new EventEmitter<number>();
  @Output() provinceChanged = new EventEmitter<number>();

  formMode: 'edit' | 'create' | null = null;
  selectedAddress: AddressInterface | null = null;

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']?.currentValue === true) {
      this.formMode = this.initialFormMode;
      this.selectedAddress = this.initialAddress;
    }
  }

  openCreate() {
    this.selectedAddress = null;
    this.formMode = 'create';
  }

  openEdit(address: AddressInterface) {
    this.selectedAddress = address;
    this.formMode = 'edit';
  }

  onSubmitted(address: AddressInterface) {
    if (this.formMode === 'create') this.create.emit(address);
    else this.update.emit(address);
  }

  back() {
    this.formMode = null;
    this.selectedAddress = null;
  }

  closeModal(){
    this.formMode=null;
    this.selectedAddress = null;
    this.close.emit();
  }


  showDeleteConfirm = false;
  pendingDeleteId?: number;
  confirmMessage = 'Bu adresi silmek istediğine emin misin?';
  
  onDeleteRequest(id: number) {
    this.pendingDeleteId = id;
    this.showDeleteConfirm = true;
  }
  
  onDeleteConfirm() {
    if (this.pendingDeleteId) this.delete.emit(this.pendingDeleteId);
    this.showDeleteConfirm = false;
    this.pendingDeleteId = undefined;
  }
  
  onDeleteCancel() {
    this.pendingDeleteId = undefined;
    this.showDeleteConfirm = false;
  }
}

import { Component,Input,Output,EventEmitter } from '@angular/core';
import { AddressInterface } from '../../interfaces/address-interface';
import { CommonModule } from '@angular/common';
import { AddressListComponent } from '../address-list/address-list.component';
@Component({
  selector: 'app-address-dashboard-widget',
  imports: [CommonModule,AddressListComponent],
  templateUrl: './address-dashboard-widget.component.html',
  styleUrl: './address-dashboard-widget.component.css'
})
export class AddressDashboardWidgetComponent {
  @Input() addresses: AddressInterface[] | null = null;
  @Input() loading: boolean = false;

  @Output() openModal = new EventEmitter<'create' | undefined>();
  @Output() editRequest = new EventEmitter<AddressInterface>();
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() makeDefault = new EventEmitter<number>();
  
  goBack() {
  }
}

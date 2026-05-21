import { Component,Input,Output,EventEmitter } from '@angular/core';
import { AddressInterface } from '../address-interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddressListComponent } from '../address-list/address-list.component';
@Component({
  selector: 'app-address-dashboard-widget',
  imports: [CommonModule,AddressListComponent],
  templateUrl: './address-dashboard-widget.component.html',
  styleUrl: './address-dashboard-widget.component.css'
})
export class AddressDashboardWidgetComponent {
  constructor(private router:Router){}
  @Input() addresses: AddressInterface[] | null = null;
  @Input() loading: boolean = false;

  @Output() openModal = new EventEmitter<'create' | undefined>();
  @Output() editRequest = new EventEmitter<AddressInterface>();
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() makeDefault = new EventEmitter<number>();
  
  backBtn() {
    this.router.navigate(['/hesabim']);
  }
}

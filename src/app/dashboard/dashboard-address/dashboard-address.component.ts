import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressComponent } from '../../shared/address/address/address.component';
@Component({
  selector: 'app-dashboard-address',
  imports: [CommonModule,AddressComponent],
  templateUrl: './dashboard-address.component.html',
  styleUrl: './dashboard-address.component.css'
})
export class DashboardAddressComponent {

}

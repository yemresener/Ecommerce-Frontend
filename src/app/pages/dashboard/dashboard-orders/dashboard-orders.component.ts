import { Component } from '@angular/core';
import { OrdersComponent } from '../../../features/order/orders/orders.component';
import { DashboardBackButtonComponent } from '../dashboard-back-button/dashboard-back-button.component';
@Component({
  selector: 'app-dashboard-orders',
  imports: [OrdersComponent,DashboardBackButtonComponent],
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.css'
})
export class DashboardOrdersComponent {

}

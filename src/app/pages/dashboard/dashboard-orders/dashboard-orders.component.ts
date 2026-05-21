import { Component } from '@angular/core';
import { OrdersComponent } from '../../../features/order/orders/orders.component';
@Component({
  selector: 'app-dashboard-orders',
  imports: [OrdersComponent],
  templateUrl: './dashboard-orders.component.html',
  styleUrl: './dashboard-orders.component.css'
})
export class DashboardOrdersComponent {

}

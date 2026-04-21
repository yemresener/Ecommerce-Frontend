import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Order } from '../../interfaces/order/order';
import { CommonModule } from '@angular/common';
import { OrderItems } from '../../interfaces/order/order-items';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-order-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  @Input() orders!:Order[];
  @Input() isLastPage?:boolean;
  @Input() loading:boolean=true;
  @Input() isLoading:boolean=false;

  @Output() loadMore = new EventEmitter<void>();
  @Output() filterChange = new EventEmitter<{status:string | undefined}>();
  @Output() selectedOrder = new EventEmitter<Order>();
  

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'Sipariş alındı',
      'shipped': 'Kargoya verildi',
      'completed': 'Teslim edildi',
      'cancelled': 'İptal edildi'
    };
    return statusMap[status] || 'default';
  }
  selectedStatus?:string;
  filterParams?:string; 

  filter(value:string | undefined = undefined){
    console.log(value);
    this.selectedStatus = value;
    this.filterParams=value;
    this.filterChange.emit({status:value});
  } 


}

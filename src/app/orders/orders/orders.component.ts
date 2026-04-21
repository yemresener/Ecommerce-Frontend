import { Component,inject,PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderService } from '../Services/order.service';
import { Order } from '../../interfaces/order/order';
import { OrderItems } from '../../interfaces/order/order-items';
import { BasePaginationDirectiveDirective } from '../../Directives/base-pagination-directive.directive';
import { FullpageLoaderComponent } from '../../shared/fullpage-loader/fullpage-loader.component';
import { isPlatformBrowser } from '@angular/common';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-orders',
  imports: [CommonModule,OrderListComponent,FullpageLoaderComponent,OrderDetailComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent extends BasePaginationDirectiveDirective<Order>{
  constructor(private service:OrderService, private router:Router){super()}
  protected platformId = inject(PLATFORM_ID);
  protected isBrowser() { return isPlatformBrowser(this.platformId)};

  filters!:{status:string | undefined};

  ngOnInit(): void {
    if(this.isBrowser()){
      this.loading = false;
      this.triggerFetch(true);
      
    }
  }

  fetchData(page:number){
    this.loading=true;

    this.service.orders({ page, ...this.filters }).subscribe({
      next:(res)=> {
        this.handleSuccess(res.data,res.meta,page===1);
      },
       
        error:(err)=>this.loading=false
    })
  }

  changeFilter(filter:{status:string | undefined}){
    this.filters = {
      ...this.filters,
      ...filter
    };
    this.isLoading=true;
    
    this.triggerFetch(true);
    
  }

  selectedOrder?:Order;
  selectOrder(order:Order){
    console.log('SALAMN');
    this.selectedOrder=order;
    console.log(this.selectedOrder);
    this.router.navigate([`hesabim/siparislerim/${order.id}`]);
  }
  

}

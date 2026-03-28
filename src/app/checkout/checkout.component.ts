import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../Services/checkout.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { Cart } from '../interfaces/cart';
import { CartSummary } from '../interfaces/cart-summary';
import { AddressInterface } from '../interfaces/address-interface';
import { Router } from '@angular/router';
import { MainToastComponent } from '../shared/components/toast/main-toast/main-toast.component';
import { ErrorMessageService } from '../Services/error-message.service';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule,MainToastComponent],
  templateUrl: './checkout.component.html',
    host: { ngSkipHydration: 'true' }, // ssr kapalı

  styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends BrowserAware{
  constructor(private service:CheckoutService,private router:Router,private errorService:ErrorMessageService){super()}

  ngOnInit(): void {
    this.checkout();
  }
  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;
  message?:{};
  loading=false;
  checkout(){
    this.loading=true;
    this.service.checkout().subscribe({
      next:(res)=>{
        console.log(res);
        this.carts=res.data;
        this.summary=res.summary;
        this.address=res.address;
        this.message=res.message;
        console.log(this.message);
        this.loading=false;

      },
      error:(err)=>{
        console.log(err);
        const errorData = err.error;
        if(errorData.action === 'redirect'){
        this.errorService.set(errorData.errors, 'warning');
        this.router.navigate(['/' + errorData.key]);
        }
      }

    })
  }

}

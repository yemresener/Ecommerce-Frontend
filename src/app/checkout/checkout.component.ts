import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../Services/checkout.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { Cart } from '../interfaces/cart';
import { CartSummary } from '../interfaces/cart-summary';
import { AddressInterface } from '../interfaces/address-interface';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
    host: { ngSkipHydration: 'true' }, // ssr kapalı

  styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends BrowserAware{
  constructor(private service:CheckoutService){super()}

  ngOnInit(): void {
    this.checkout();
  }
  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;

  checkout(){
    this.service.checkout().subscribe({
      next:(res)=>{
        console.log(res);
        this.carts=res.data;
        this.summary=res.summary;
        this.address=res.address;

      }
    })
  }

}

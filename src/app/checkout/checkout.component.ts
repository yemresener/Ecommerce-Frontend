import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../Services/checkout.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { Cart } from '../interfaces/cart';
import { CartSummary } from '../interfaces/cart-summary';
import { AddressInterface } from '../interfaces/address-interface';
import { Router } from '@angular/router';
import { MainToastComponent } from '../shared/components/toast/main-toast/main-toast.component';
import { ErrorMessageService } from '../Services/error-message.service';
import { AddressComponent } from '../shared/address/address/address.component';
import { FullpageLoaderComponent } from '../shared/fullpage-loader/fullpage-loader.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PaymentService } from '../Services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule,MainToastComponent,AddressComponent,FullpageLoaderComponent,NgxMaskDirective],
  templateUrl: './checkout.component.html',
    host: { ngSkipHydration: 'true' }, // ssr 
    providers: [provideNgxMask()],

  styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends BrowserAware{
  constructor(private service:CheckoutService,private router:Router,private errorService:ErrorMessageService,private paymentService:PaymentService){super()}
  @ViewChild(AddressComponent) addressComp!: AddressComponent;

  async ngOnInit() {
    this.checkout();
  }


  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;
  message?:{};
  loading=false;
  
  cartNumber!:string;
  cvv?:number;
  expMonth!:string;
  expYear!:string;
  cardName!:string;

  checkout(){
    this.loading=true;
    this.service.checkout().subscribe({
      next:(res)=>{
        console.log(res);
        this.carts=res.data;
        this.summary=res.summary;
        this.address=res.address;
        console.log(this.address,'ADRES KANKA');
        console.log(res.address,'RES ADDREWSS')
        if(!this.address){
          this.addressComp.toggleModal(true);
        }

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

  payment(){


  }


  onAddressSelected(address: AddressInterface) {
    this.address = address;
  }

}

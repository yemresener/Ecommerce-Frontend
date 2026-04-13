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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorService } from '../Services/Validator/form-validator.service';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule,MainToastComponent,AddressComponent,
    FullpageLoaderComponent,NgxMaskDirective,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
    host: { ngSkipHydration: 'true' }, // ssr 
    providers: [provideNgxMask()],

  styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends BrowserAware{
  safeHtml: SafeHtml | null = null;
  cardForm:FormGroup;

  constructor(private service:CheckoutService,private router:Router,private errorService:ErrorMessageService,
    private fb:FormBuilder,
    private validatorService:FormValidatorService,
    private paymentService:PaymentService
  ){super()

    this.cardForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required,Validators.minLength(16),Validators.maxLength(19),
          this.validatorService.luhnValidator
        ]
      ],
      expiry:['',[Validators.required,this.validatorService.dateValidator]],

      cardName: ['',[Validators.required,Validators.minLength(3)]],
  
      cvv: ['',[Validators.required,Validators.pattern(/^\d{3}$/)]],
      saveCard: [0]
    });

  }

  get cardNumber() {return this.cardForm.get('cardNumber')};
  get expiry() {return this.cardForm.get('expiry')};
  get cardName() {return this.cardForm.get('cardName')};
  get cvv() {return this.cardForm.get('cvv')};
  get saveCard() {return this.cardForm.get('saveCard')};



  @ViewChild(AddressComponent) addressComp!: AddressComponent;

  async ngOnInit() {
    this.checkout();
  }

  toastMessage = '';
  status:'success' | 'error' | 'warning' | 'info' = 'success';




  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;
  message?:{};
  loading=false;
  
  cartNumber!:string;

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
    if(this.cardForm.invalid){
      this.cardForm.markAllAsTouched();
      return;
    }
    this.toastMessage='';
    const { cardName, cardNumber, cvv, saveCard, expiry } = this.cardForm.value;

    const cleanExpiry = (expiry || '').replace(/\D/g, '');
    const expire_month = Number(cleanExpiry.slice(0, 2));
    const expire_year = Number(cleanExpiry.slice(2, 4));

    const payload = {
        save_card:saveCard,
        card_holder_name: cardName,
        card_number:cardNumber,
        expire_month:expire_month,
        expire_year:expire_year,
        cvc:cvv
    }
    console.log(payload)
    this.paymentService.preparePayment(payload).subscribe({
      next:(res)=>{
        if(this.isBrowser()){
          const newWin = window.open('', '_self');
          newWin?.document.open();
          newWin?.document.write(res.html_content);
          newWin?.document.close();
        }
       

      },
      error: (err) =>{

        console.error(err)
        const errorData = err.error;
        if(errorData.action === 'redirect'){
          this.errorService.set(errorData.errors,'warning');
          this.router.navigate(['/' + errorData.key]);
        }
        this.toastMessage = errorData.message;
        this.status = 'error';
        console.log(this.toastMessage,this.status);
        
      }

    })

  }



  onAddressSelected(address: AddressInterface) {
    this.address = address;
  }

}

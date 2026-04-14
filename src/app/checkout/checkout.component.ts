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
import { Installment } from '../interfaces/payment/installment';
import { debounce, debounceTime, first } from 'rxjs';
import { CreditCardInterface } from '../interfaces/payment/creditCard/credit-card-interface';
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
    this.listenInstallments();
  }

  toastMessage = '';
  status:'success' | 'error' | 'warning' | 'info' = 'success';




  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;
  message?:{};
  loading=false;
  savedCards?:CreditCardInterface[];
  cartNumber!:string;
  
  checkout(){
    this.loading=true;
    this.service.checkout().subscribe({
      next:(res)=>{
        console.log(res);
        this.carts=res.data;
        this.summary=res.summary;
        this.firstSum=res.summary.total;
        this.address=res.address;
        this.savedCards= res.savedCards
        this.installments=res.installments;
        console.log(this.address,'ADRES KANKA');
        console.log(res.address,'RES ADDREWSS')
        if(!this.address){
          this.addressComp.toggleModal(true);
        }

        this.message=res.message;
        console.log(this.message);
        this.loading=false;
        const defaultCard = this.savedCards.find(card =>card.is_default);
        this.selectedSavedCard=defaultCard!.id;
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

  paymentWithCard(){
    if(!this.isNewCard) return;
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
    this.paymentService.paymentCard(payload).subscribe({
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

  payWithSaved(){
    if(!this.selectedSavedCard || this.isNewCard) return;

    this.paymentService.paymentSavedCard(this.selectedSavedCard).subscribe({
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


  payment(){
    if(this.isNewCard){
      this.paymentWithCard();
      return;
    }
    this.payWithSaved();
    return;

   

  }

  selectedSavedCard: number | null = null;
  isNewCard: boolean = false;
  showCardForm: boolean = false;

  selectSavedCard(item:CreditCardInterface){
    if(this.selectedSavedCard === item.id) return;
    this.selectedSavedCard = item.id;
    this.isNewCard = false;
    this.showCardForm = false;

    console.log(this.selectedSavedCard,'SAVED');
    this.cardForm.reset();
    

  }

  selectNewCard() {
    this.selectedSavedCard = null;
    this.isNewCard = true;
    this.showCardForm = true;
  }








  
  installments!:Installment[];
  card_type?:string;
  card_family?:string;
  selectedInstallment:number=1;
  firstSum?:number;
  changeInstallment(item:Installment){
    this.selectedInstallment=item.installment;
    console.log(item);
    console.log(this.firstSum,'First one')
    const base = this.firstSum ?? 0;
    const diff = item.installment_diff ?? 0;

    this.summary.installment_diff = diff;
    this.summary.total = Number((base + diff).toFixed(2));
      
  }
  listenInstallments(){
    let sixDigits:string='';
    this.cardNumber?.valueChanges.subscribe((value:string)=>{
        console.log(value,'VALUE');
        if(!this.isNewCard) return;
        if(value.length===16){
          if(this.cardNumber?.invalid) return;

          const current = value.slice(0,6);
          if(sixDigits === current) return ;
          sixDigits=current;
          this.paymentService.getInstallment(current).subscribe({
            next:(res)=>{
              console.log(res);
              this.installments=res.installments;
              this.card_type=res.card_type;
              this.card_family=res.card_family;
              console.log(res.installments,'ISNTALL');
            },
            error:(err)=>{
              console.log(err);
            }
          })
        }
        if (value.length < 16) {
          this.installments = [];
          sixDigits = ''; 
          this.selectedInstallment = 1; // 🔥 EKLE
           sixDigits = '';
        }
      })

    
  }


  onAddressSelected(address: AddressInterface) {
    this.address = address;
  }

}

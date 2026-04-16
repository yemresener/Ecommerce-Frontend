import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../Services/checkout.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { Cart } from '../interfaces/cart';
import { CartSummary } from '../interfaces/cart-summary';
import { AddressInterface } from '../interfaces/address-interface';
import { Router,ActivatedRoute } from '@angular/router';
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
import { debounce, debounceTime, first,finalize } from 'rxjs';
import { CreditCardInterface } from '../interfaces/payment/creditCard/credit-card-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { NewCardPayload } from '../interfaces/payment/payload/new-card-payload';
import { SavedCardPayload } from '../interfaces/payment/payload/saved-card-payload';


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

  constructor(private service:CheckoutService,private router:Router,private errorService:ErrorMessageService, private route:ActivatedRoute,
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
    this.route.queryParams.subscribe(params=>{
      if(params['payment_error']){
          const errorMessage = params['payment_error'];
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { payment_error: null },
            queryParamsHandling: 'merge',
            replaceUrl: true 
          });
          this.toastMessage = errorMessage;
          this.status = 'error';
      }
    })
    this.checkout();
    this.listenInstallments();
  }

  toastMessage = '';
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  private installmentCache = new Map<string, Installment[]>();
  installmentSkeleton=false;
  

  getSavedCardInstallments(bin: string) {
    this.activeCardContext = 'saved';
    this.getInstallments(bin);
  }

  getInstallments(bin: string) {
    if (this.installmentCache.has(bin)) {
      this.installments = this.installmentCache.get(bin)!;
      return;
    }
  
    this.installmentSkeleton = true;
  
    this.paymentService.getInstallment(bin).subscribe({
      next: (res) => {
        this.installmentCache.set(bin, res.installments);
  
        this.installments = res.installments;
        this.card_type = res.card_type;
        this.card_family = res.card_family;
  
        this.installmentSkeleton = false;
      },
      error: () => {
        this.installmentSkeleton = false;
      }
    });
  }


  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;
  message?:{};
  loading=false;
  redirectToPayment=false;
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
        console.log(this.address,'ADRES KANKA');
        console.log(res.address,'RES ADDREWSS')
        if(!this.address){
          this.addressComp.toggleModal(true);
        }

        this.message=res.message;
        console.log(this.message);
        this.loading=false;
        
        this.selectedSavedCard=res.default_card?.id;
        if(!this.selectedSavedCard) {
          console.log('SALAMLAR');
          this.activeCardContext='new' 
          this.showCardForm=true;
        }
        this.installments=res.installments;
        
        this.installmentCache.set(res.default_card?.bin_number,res.installments);
        console.log(this.activeCardContext,'TES');

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

    if(this.activeCardContext==='saved') return;
    if(this.cardForm.invalid){
      this.cardForm.markAllAsTouched();
      return;
    }
    this.toastMessage='';
    this.redirectToPayment=true;

    const { cardName, cardNumber, cvv, saveCard, expiry } = this.cardForm.value;

    const cleanExpiry = (expiry || '').replace(/\D/g, '');
    const expire_month = Number(cleanExpiry.slice(0, 2));
    const expire_year = Number(cleanExpiry.slice(2, 4));

    const payload:NewCardPayload = {
        save_card:saveCard,
        card_holder_name: cardName,
        card_number:cardNumber,
        expire_month:expire_month,
        expire_year:expire_year,
        cvc:cvv,
        installment:this.selectedInstallment
    }

    this.handleNewCardApiCall(payload);


  }

  payWithSaved(){
    if(!this.selectedSavedCard || this.activeCardContext==='new') return;
    this.redirectToPayment=true;

    const payload:SavedCardPayload = {
      saved_card_id:this.selectedSavedCard,
      installment:this.selectedInstallment
    }
    this.handleSavedCardApiCall(payload);
  
  }

  processIyzicoHtml(htmlContent: string) {
    if (this.isBrowser()) {
      const newWin = window.open('', '_self');
      newWin?.document.open();
      newWin?.document.write(htmlContent);
      newWin?.document.close();
    }
  }

  handleNewCardApiCall(payload: NewCardPayload) {
    
    this.paymentService.paymentCard(payload) 
      .pipe(finalize(() => this.redirectToPayment = false))
      .subscribe({
        next: (res) => this.processIyzicoHtml(res.html_content),
        error: (err) => this.handleErrorResponse(err)
      });
  }

  handleSavedCardApiCall(payload: SavedCardPayload) {

    this.paymentService.paymentSavedCard(payload) 
      .pipe(finalize(() => this.redirectToPayment = false))
      .subscribe({
        next: (res) => this.processIyzicoHtml(res.html_content),
        error: (err) => this.handleErrorResponse(err)
      });
  }


  payment(){
    if(this.activeCardContext=='new'){
      this.paymentWithCard();
      return;
    }
    this.payWithSaved();

  }

  selectedSavedCard: number | null = null;
  showCardForm: boolean = false;

  selectSavedCard(item:CreditCardInterface){
    this.activeCardContext = 'saved';
    this.selectedSavedCard = item.id;
    

    this.showCardForm = false;
    this.selectedInstallment = 1;

    this.resetInstallments();
    this.cardForm.reset();
    this.getInstallments(item.bin_number)

  }

  selectNewCard() {
    this.activeCardContext = 'new';

    this.selectedSavedCard = null;
    this.showCardForm = true;

    this.selectedInstallment = 1;
    this.resetInstallments();
  }


  getCardLogo(bank: string): string {
    switch ((bank || '').toUpperCase()) {
      case 'VISA':
        return 'assets/cards/visa.svg';
  
      case 'MASTER_CARD':
      case 'MASTERCARD':
        return 'assets/cards/mastercard.svg';
  
      case 'TROY':
        return 'assets/cards/troy.svg';
  
      default:
        return 'assets/cards/default-card.svg';
    }
  }





  installments!:Installment[];
  card_type?:string;
  card_family?:string;

  activeCardContext!: 'new' | 'saved';


  selectedInstallment:number=1;
  selectedNewCardInstallment:number=1;

  firstSum:number=0;

  changeInstallment(item:Installment){
    this.selectedInstallment = item.installment;

    console.log(item);
    console.log(this.firstSum,'First one')
    const base = this.firstSum ?? 0;
    const diff = item.installment_diff ?? 0;

    this.summary.installment_diff = diff;
    this.summary.total = Number((base + diff).toFixed(2));
      
  }
  listenInstallments() {
    let lastBin = '';
    this.cardNumber?.valueChanges.subscribe((value: string) => {
  
      if (this.activeCardContext!=='new') return;
  
  
      if (!value || value.length < 6) {
        this.resetInstallments();
        lastBin = '';
        return;
      }
  
      if (value.length !== 16) return;
      if (this.cardNumber?.invalid) return;
      if(value.length==16){

    
      const bin = value.slice(0, 6);
      if (bin === lastBin) return;
  
      lastBin = bin;
  
      this.getInstallments(bin);
    }
    });
  }

  resetInstallments() {
    this.installments = [];
    this.selectedInstallment = 1;
    this.summary.installment_diff = 0;
    this.summary.total = this.firstSum;
  }

  handleErrorResponse(err:HttpErrorResponse){
    this.redirectToPayment=false;

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

  onAddressSelected(address: AddressInterface) {
    this.address = address;
  }

}

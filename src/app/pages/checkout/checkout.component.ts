import { Component,ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../../features/checkout/checkout.service';
import { BrowserAware } from '../../shared/base/browser-aware';
import { Cart } from '../../features/cart/interfaces/cart';
import { CartSummary } from '../../features/cart/interfaces/cart-summary';
import { AddressInterface } from '../../features/address/address-interface';
import { Router,ActivatedRoute } from '@angular/router';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { ErrorMessageService } from '../../NoApiServices/error-message.service';
import { AddressComponent } from '../../features/address/address/address.component';
import { FullpageLoaderComponent } from '../../shared/fullpage-loader/fullpage-loader.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { PaymentService } from '../../features/payment/payment-methods/payment.service';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorService } from '../../NoApiServices/form-validator.service';
import { Installment } from '../../features/payment/interfaces/installment';
import { debounce, debounceTime, first,finalize } from 'rxjs';
import { CreditCardInterface } from '../../features/payment/interfaces/credit-card-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { NewCardPayload } from '../../features/payment/interfaces/new-card-payload';
import { SavedCardPayload } from '../../features/payment/interfaces/saved-card-payload';

import { DeliveryMessageService } from '../../NoApiServices/delivery-message.service';
import { PermissionModalComponent } from '../../staticPages/permissions/permission-modal/permission-modal.component';
import { PaymentMethodsComponent } from '../../features/payment/payment-methods/payment-methods.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule,MainToastComponent,AddressComponent,
    FullpageLoaderComponent,NgxMaskDirective,ReactiveFormsModule,
    PaymentMethodsComponent,PermissionModalComponent],
  templateUrl: './checkout.component.html',
    host: { ngSkipHydration: 'true' }, // ssr 
    providers: [provideNgxMask()],

  styleUrl: './checkout.component.css'
})
export class CheckoutComponent extends BrowserAware{
  safeHtml: SafeHtml | null = null;

  constructor(private service:CheckoutService,private router:Router,private errorService:ErrorMessageService, private route:ActivatedRoute,
    private fb:FormBuilder,
    private validatorService:FormValidatorService,
    private paymentService:PaymentService,
    private deliveryService:DeliveryMessageService
  ){super()
    this.permissionsForm = this.fb.group({
      preliminaryInformation: [false, [Validators.requiredTrue]],
      distanceSales: [false, [Validators.requiredTrue]]
    })
  }

  get preliminaryInformation() { return this.permissionsForm.get('preliminaryInformation'); }
  get distanceSales() { return this.permissionsForm.get('distanceSales'); }

  permissionsForm:FormGroup;
  activeModalType: 'pre-info' | 'distance-sales' | null = null;

  @ViewChild(PaymentMethodsComponent) paymentMethodsComp!: PaymentMethodsComponent;
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
    this.deliveryMessage=this.deliveryService.deliveryMessage;
  }

  toastMessage = '';
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  
  initalInstallment?:{bin_number:string,Installment:Installment[]}


  carts!:Cart[];
  summary!:CartSummary;
  address!:AddressInterface;
  message?:{};
  loading=false;
  redirectToPayment=false;
  savedCards?:CreditCardInterface[];
  deliveryMessage?:string;

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
        if(!this.address){
          this.addressComp.openModal('create');
        }

        this.message=res.message;
        console.log(this.message);
        this.loading=false;
        
        this.selectedSavedCard=res.default_card?.id;
        if(!this.selectedSavedCard) {
          this.activeCardContext='new' 
          this.showCardForm=true;
        }
        this.initalInstallment={bin_number:res.default_card.bin_number,
          Installment:res.installments}
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
    this.toastMessage='';
    const child = this.paymentMethodsComp;

    if(this.permissionsForm.invalid){
      this.permissionsForm.markAllAsTouched();
      return;
    }
    this.redirectToPayment=true;

    if(this.activeCardContext==='new'){

      if (child.cardForm.invalid) {
        this.redirectToPayment=false;

        child.cardForm.markAllAsTouched();

        return;

      }
      const { cardName, cardNumber, cvv, saveCard, expiry } = child.cardForm.value;

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
          installment:this.selectedInstallment,
          pre_info_at:this.permissionsForm.value.preliminaryInformation,
          dist_sales_at:this.permissionsForm.value.distanceSales
      }

      this.handleNewCardApiCall(payload);

    }else {
      if (!this.selectedSavedCard) return;

      const payload: SavedCardPayload = {
        saved_card_id: this.selectedSavedCard,
        installment: this.selectedInstallment,
        pre_info_at:this.permissionsForm.value.preliminaryInformation,
        dist_sales_at:this.permissionsForm.value.distanceSales
      };
      
      this.handleSavedCardApiCall(payload);

    }
  }

  selectedSavedCard: number | null = null;
  showCardForm: boolean = false;

  activeCardContext!: 'new' | 'saved';
  selectedInstallment:number=1;

  firstSum:number=0;

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

  onChangeInstallment(item:Installment){
    this.selectedInstallment = item.installment;
    const base = this.firstSum ?? 0;
    const diff = item.installment_diff ?? 0;

    this.summary.installment_diff = diff;
    this.summary.total = Number((base + diff).toFixed(2));
      
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

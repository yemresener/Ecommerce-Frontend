import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardInterface } from '../../interfaces/payment/creditCard/credit-card-interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidatorService } from '../../Services/Validator/form-validator.service';
import { PaymentService } from '../../Services/payment.service';
import { Installment } from '../../interfaces/payment/installment';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-payment-methods',
  imports: [CommonModule,ReactiveFormsModule,NgxMaskDirective],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.css'
})
export class PaymentMethodsComponent {
  @Input() savedCards?: CreditCardInterface[];
  @Input() firstSum: number = 0; 
  @Input() selectedSavedCard: number | null = null;
  @Input() initialInstallments?: {bin_number:string,Installment:Installment[]};

  @Output() contextChanged = new EventEmitter<'new' | 'saved'>();
  @Output() cardSelected = new EventEmitter<number | null>();
  @Output() installmentChanged = new EventEmitter<any>(); 
  


  activeCardContext: 'new' | 'saved' = 'new';
  showCardForm: boolean = true;
  selectedInstallment: number = 1;

  installments?: Installment[] ; 
  installmentSkeleton = false;
  private installmentCache = new Map<string, any[]>();
  card_type?: string;
  card_family?: string;

  cardForm: FormGroup;

  constructor(private paymentService:PaymentService,
    private fb:FormBuilder, private validatorService:FormValidatorService){
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


  ngOnInit() {
    this.listenInstallments();
   
    if(this.selectedSavedCard) {
      this.activeCardContext = 'saved';
      this.showCardForm = false;

      if (this.initialInstallments?.Installment && this.initialInstallments.Installment.length > 0) {
        this.installmentCache.set(this.initialInstallments.bin_number,
           this.initialInstallments.Installment);
           this.installments=this.installmentCache.get(this.initialInstallments.bin_number);
          console.log(this.initialInstallments,'INSTALLMETNS')
      }
    }
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

  selectNewCard() {
    this.activeCardContext = 'new';

    this.selectedSavedCard = null;
    this.showCardForm = true;

    this.lastBin = '';
    this.resetInstallments();

    this.contextChanged.emit('new');
    this.cardSelected.emit(null);
  }

  
  selectSavedCard(item:CreditCardInterface){
    this.activeCardContext = 'saved';
    this.selectedSavedCard = item.id;
    

    this.showCardForm = false;

    this.resetInstallments();
    this.cardForm.reset();
    this.getInstallments(item.bin_number)

    this.contextChanged.emit('saved');
    this.cardSelected.emit(item.id);
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


  changeInstallment(item:Installment){
    this.selectedInstallment = item.installment;
  
    this.installmentChanged.emit(item);
        
  }
    private lastBin: string = '';

    listenInstallments() {

      this.cardNumber?.valueChanges.subscribe((value: string) => {
        if (this.activeCardContext!=='new') return;
        
        if (!value || value.length < 6) {

          this.lastBin = '';
          this.resetInstallments();

          return;
        }
    
        if (value.length !== 16) return;
        if (this.cardNumber?.invalid) return;
        if(value.length===16){
  
          
        const bin = value.slice(0, 6);
        if (bin === this.lastBin) return;
          this.lastBin = bin;
    
        this.getInstallments(bin);
      }
      });
    }
  
    resetInstallments() {
      this.installments = [];
      this.selectedInstallment = 1;
      this.installmentChanged.emit({ installment: 1, installment_diff: 0 });
    }
}

import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter,HostListener } from '@angular/core';
import { CreditCardInterface } from '../../payment/interfaces/credit-card-interface';
import { DashboardBackButtonComponent } from '../../../pages/dashboard/dashboard-back-button/dashboard-back-button.component';

@Component({
  selector: 'app-saved-card-list',
  imports: [CommonModule,DashboardBackButtonComponent],
  templateUrl: './saved-card-list.component.html',
  styleUrl: './saved-card-list.component.css'
})
export class SavedCardListComponent {
  @Input() cards:CreditCardInterface[] | null = null;
  @Input() loading=false;
  @Input() firstLoading=false;

  @Output() updateToDefault = new EventEmitter<CreditCardInterface>();
  @Output() deleteCard = new EventEmitter<CreditCardInterface>();


  activeCard?:CreditCardInterface;
    toggleMenu(card:CreditCardInterface,event:Event){
      event.stopPropagation();
      console.log(card,'CARD','ACTİVECARD',this.activeCard);
      if(this.activeCard===card) {
        this.activeCard=undefined;
        return;
      }
      this.activeCard=card
    }

  
  onDefaultBtn(card:CreditCardInterface){
    if(this.loading) return;
    if(card.is_default) return;
    this.updateToDefault.emit(card);
  }
  
  onDeleteBtn(card:CreditCardInterface){
    this.deleteCard.emit(card);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {

    if (this.activeCard) {
      this.activeCard = undefined;
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



}

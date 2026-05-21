import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/user';
import { AddressInterface } from '../../../features/address/address-interface';
import { Cart } from '../../../features/cart/interfaces/cart';
import { CartSummary } from '../../../features/cart/interfaces/cart-summary';
@Component({
  selector: 'app-pre-info-list',
  imports: [CommonModule],
  templateUrl: './pre-info-list.component.html',
  styleUrl: './pre-info-list.component.css'
})
export class PreInfoListComponent {
  currentDate?:Date
  constructor(){
    this.currentDate = new Date();
  }

  @Input() user:User | null = null;
  @Input() selectedAddress!:AddressInterface;
  @Input() cartItems!:Cart[];
  @Input() summarry!:CartSummary
}

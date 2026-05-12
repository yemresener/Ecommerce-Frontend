import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces/user';
import { AddressInterface } from '../../interfaces/address-interface';
import { Cart } from '../../interfaces/cart';
import { CartSummary } from '../../interfaces/cart-summary';
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

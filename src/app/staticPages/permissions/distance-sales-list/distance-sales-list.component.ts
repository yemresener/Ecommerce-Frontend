import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/user';
import { AddressInterface } from '../../../features/address/address-interface';
import { Cart } from '../../../features/cart/interfaces/cart';
import { CartSummary } from '../../../features/cart/interfaces/cart-summary';
@Component({
  selector: 'app-distance-sales-list',
  imports: [CommonModule],
  templateUrl: './distance-sales-list.component.html',
  styleUrl: './distance-sales-list.component.css'
})
export class DistanceSalesListComponent {
  currentDate?:Date
  constructor(){
    this.currentDate = new Date();
  }

  @Input() user:User | null = null;
  @Input() selectedAddress!:AddressInterface;
  @Input() cartItems!:Cart[];
  @Input() summarry!:CartSummary
}

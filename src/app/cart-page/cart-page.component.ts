import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  couponInput=0;

  couponOpen = false;

  toggleCoupon() {
    this.couponOpen = !this.couponOpen;
  }
  
  closeCoupon() {
    this.couponOpen = false;
  }

}

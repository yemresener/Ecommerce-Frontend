import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSummary } from '../../../../interfaces/cart-summary';
@Component({
  selector: 'app-cart-detail',
  imports: [CommonModule],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent {
  @Input() summary!:CartSummary;

  mPrice=false;
}

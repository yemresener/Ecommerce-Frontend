import { Component, EventEmitter, Input, Output,inject } from '@angular/core';
import { AddressInterface } from '../../../features/address/address-interface';
import { Cart } from '../../../features/cart/interfaces/cart';
import { CartSummary } from '../../../features/cart/interfaces/cart-summary';
import { AuthService } from '../../../core/user-service/auth.service';
import { PreInfoListComponent } from '../pre-info-list/pre-info-list.component';
import { DistanceSalesListComponent } from '../distance-sales-list/distance-sales-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-permission-modal',
  imports: [PreInfoListComponent,DistanceSalesListComponent,CommonModule],
  templateUrl: './permission-modal.component.html',
  styleUrl: './permission-modal.component.css'
})
export class PermissionModalComponent {
  @Input() modalType: 'pre-info' | 'distance-sales' | null = null;
  @Input() selectedAddress!:AddressInterface;
  @Input() cartItems!:Cart[];
  @Input() summarry!:CartSummary

  @Output() close = new EventEmitter<void>();

  authService = inject(AuthService);

  user = this.authService.getUser();

 
}

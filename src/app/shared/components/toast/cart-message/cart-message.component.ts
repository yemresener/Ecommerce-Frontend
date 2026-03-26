import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart-message',
  imports: [CommonModule],
  templateUrl: './cart-message.component.html',
  styleUrl: './cart-message.component.css'
})
export class CartMessageComponent {
  @Input() message: string = '';
  @Input() errors: string[] = [];
  @Output() closed = new EventEmitter<void>();

  onConfirm() {
    this.closed.emit();
}
}

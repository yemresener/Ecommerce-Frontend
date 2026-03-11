import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-error-box',
  imports: [CommonModule],
  templateUrl: './error-box.component.html',
  styleUrl: './error-box.component.css'
})
export class ErrorBoxComponent {
  @Input() message: string = '';
  @Input() title:string = 'Bir hata oluştu';

  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}

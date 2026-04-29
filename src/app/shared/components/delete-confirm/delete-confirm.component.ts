import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-delete-confirm',
  imports: [CommonModule],
  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.css'
})
export class DeleteConfirmComponent {
  @Input() message:string='';
  @Input() isOpen = false;
  @Input() messageTitle:string='';
  @Input() icon:string='';

  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onCancel(){
    this.cancel.emit();
  }
  onConfirm(){
    this.confirm.emit();
  }
}

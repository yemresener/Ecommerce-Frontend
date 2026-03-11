import { Directive,Input,Output,EventEmitter } from "@angular/core";

@Directive()
export abstract class ErrorBase {
    @Input() message: string = '';
    @Input() title: string = '';
    @Output() closed = new EventEmitter<void>();

    
  }
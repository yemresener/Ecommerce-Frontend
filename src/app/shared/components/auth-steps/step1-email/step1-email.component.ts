import { Component,Output,EventEmitter,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBoxComponent } from '../../error-box/error-box.component';
import { ErrorBase } from '../../../base/error-base';

@Component({
  selector: 'app-step1-email',
  imports: [CommonModule,RouterLink,ReactiveFormsModule,ErrorBoxComponent],
  templateUrl: './step1-email.component.html',
  styleUrl: './step1-email.component.css'
})
export class Step1EmailComponent extends ErrorBase{

  Form:FormGroup;

  @Output() submitEmail = new EventEmitter<string>();
  @Input() loading:boolean=false;
  @Input() switchButtons?:boolean;
  @Input() componentTitle?:string;
  @Input() passwordReset?:boolean;



  constructor(private fb:FormBuilder){
    super();
    this.Form=this.fb.group({
      email:['',[Validators.required, Validators.email]],
    });
  }
  get email() {return this.Form.get('email')};
  
  onSubmit(){
    if(this.Form.invalid){
      this.Form.markAllAsTouched();
      return;
    }
    
    this.submitEmail.emit(this.email?.value);
  }

}

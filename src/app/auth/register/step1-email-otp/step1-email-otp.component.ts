import { Component,Output,EventEmitter,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBoxComponent } from '../../../shared/components/error-box/error-box.component';
import { ErrorBase } from '../../../shared/base/error-base';
@Component({
  selector: 'app-step1-email-otp',
  imports: [CommonModule,RouterLink,ReactiveFormsModule,ErrorBoxComponent],
  templateUrl: './step1-email-otp.component.html',
  styleUrl: './step1-email-otp.component.css'
})
export class Step1EmailOtpComponent extends ErrorBase {
  registerForm:FormGroup;

  @Output() submitEmail = new EventEmitter<string>();
  @Input() loading:boolean=false;


  constructor(private fb:FormBuilder){
    super();
    this.registerForm=this.fb.group({
      email:['',[Validators.required, Validators.email]],
    });
  }
  get email() {return this.registerForm.get('email')};
  
  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.submitEmail.emit(this.email?.value);
  }
}

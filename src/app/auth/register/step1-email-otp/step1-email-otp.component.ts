import { Component,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValueChangeEvent } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step1-email-otp',
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './step1-email-otp.component.html',
  styleUrl: './step1-email-otp.component.css'
})
export class Step1EmailOtpComponent {
  registerForm:FormGroup;

  @Output() submitEmail = new EventEmitter<string>();


  constructor(private fb:FormBuilder){
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

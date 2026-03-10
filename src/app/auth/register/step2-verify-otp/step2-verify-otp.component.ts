import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-step2-verify-otp',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './step2-verify-otp.component.html',
  styleUrl: './step2-verify-otp.component.css'
})
export class Step2VerifyOtpComponent {
  @Input() email!:string;
  @Output() submitOtp = new EventEmitter<number>();

  otpForm:FormGroup;

  constructor(private fb:FormBuilder){
    this.otpForm=this.fb.group({
      otp:['',[Validators.required,Validators.minLength(6)] ]
    });
  }
  get otp(){ return this.otpForm.get('otp')};

  onSubmit(){
    if(this.otpForm.invalid){
      this.otpForm.markAllAsTouched();
      return;
    }
    this.submitOtp.emit(this.otp?.value);
  }
}

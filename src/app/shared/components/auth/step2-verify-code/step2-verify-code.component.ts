import { Component,Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBoxComponent } from '../../error-box/error-box.component';
import { ErrorBase } from '../../../base/error-base';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
@Component({
  selector: 'app-step2-verify-code',
  imports: [CommonModule,ReactiveFormsModule,ErrorBoxComponent],
  templateUrl: './step2-verify-code.component.html',
  styleUrl: './step2-verify-code.component.css'
})
export class Step2VerifyCodeComponent extends ErrorBase {


  private platformId = inject(PLATFORM_ID);

  @Input() email!:string;
  @Input() loading:boolean=false;
  @Input() componentTitle!:string;

  @Output() submitOtp = new EventEmitter<number>();
  @Output() resentOtpEvent = new EventEmitter<any>();

  otpForm:FormGroup;

  constructor(private fb:FormBuilder){
    super();
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

  resendOtp(){
    if (this.resendTimer > 0) return;
    this.resentOtpEvent.emit();
    this.startTimer();
  }

  resendTimer = 0;
  private timerInterval:any;

  startTimer(){
    if (!isPlatformBrowser(this.platformId)) return;

    this.resendTimer=60;
    this.timerInterval = setInterval(()=>{
      this.resendTimer--;
      if(this.resendTimer<=0 ){
        clearInterval(this.timerInterval);
      }
    },1000)
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval); 
  }
  ngOnInit() {
    this.startTimer(); 
  }
}

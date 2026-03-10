import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Step1EmailOtpComponent } from './step1-email-otp/step1-email-otp.component';
import { Step2VerifyOtpComponent } from './step2-verify-otp/step2-verify-otp.component';
import { Step3CreateAccComponent } from './step3-create-acc/step3-create-acc.component';
@Component({
  selector: 'app-register',
  imports: [CommonModule,RouterLink,Step1EmailOtpComponent,Step2VerifyOtpComponent,Step3CreateAccComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  open_password=false;
  verifyOtp=false;
  step:string='emailOtp';
  userMail!:string;
  onOtpVerify(email:string){
    console.log(email);
    this.userMail=email;
    this.step='verifyOtp';
  }

  submitOtp(otp:number){
    console.log(otp,'OTP GELDİ');
    this.step='createAcc';
  }

  createAcc(register:any){
    console.log(register)
  }
}

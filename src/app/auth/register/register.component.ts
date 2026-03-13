import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Step3CreateAccComponent } from './step3-create-acc/step3-create-acc.component';
import { RegisterService } from '../../Services/auth/register.service';
import { OtpApiResponse } from '../../interfaces/otp-api-response';
import { CreateAcc } from '../../interfaces/register/create-acc';
import { Step1EmailComponent } from '../../shared/components/auth/step1-email/step1-email.component';
import { Step2VerifyCodeComponent } from '../../shared/components/auth/step2-verify-code/step2-verify-code.component';
@Component({
  selector: 'app-register',
  imports: [CommonModule,RouterLink,Step3CreateAccComponent,Step1EmailComponent,Step2VerifyCodeComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private service:RegisterService){}

  step:string='emailOtp';
  userMail!:string;
  verifyToken!:string;
  verifiedToken!:string;

  loadingStep1:boolean=false;
  loadingStep2:boolean=false;
  loadingStep3:boolean=false;

  errorMessage:string='';

  onOtpVerify(email:string){
    this.loadingStep1=true;
    this.service.sendOtp(email).subscribe({
      next:(res)=>{
       

        this.userMail=email;
        this.verifyToken=res.token;
        this.errorMessage='';

        this.loadingStep1=false;
        this.step='verifyOtp';


      },
      error:(err)=>{
        this.errorMessage=err.error.message;

        this.loadingStep1=false;

      }
    });


  }

  resendOtp(){
    this.service.sendOtp(this.userMail).subscribe({
      next:(res)=>{
        this.verifyToken=res.token;
        this.errorMessage='';

      },
      error:(err)=>{
        this.errorMessage=err.error.message;


      }
    })
  }

  submitOtp(otp:number){
    this.loadingStep2=true;

    const body={code:otp,token:this.verifyToken};
    this.service.verifyOtp(body).subscribe({
      next:(res)=>{
        this.verifiedToken=res.token;
        this.loadingStep2=false;

        this.step='createAcc';
        this.errorMessage='';
      },
      error:(err)=>{

        this.errorMessage=err.error.message;
        this.loadingStep2=false;

      }
    })
  }

  createAcc(register:CreateAcc){
    this.loadingStep3=true;

    const body={
      ...register,
      token:this.verifiedToken
    }
    this.service.register(body).subscribe({
      next:(res)=>{
        this.loadingStep3=false;

        // yönlendirme yapılacak

      },
      error:(err)=>{
        this.errorMessage=err.error.message;
        this.loadingStep3=false;

      }
    })
  }
}

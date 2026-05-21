import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordService } from '../../../core/user-service/reset-password.service';
import { Step3ResetPassComponent } from '../step3-reset-pass/step3-reset-pass.component';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Step1EmailComponent } from '../../../shared/components/auth-steps/step1-email/step1-email.component';
import { Step2VerifyCodeComponent } from '../../../shared/components/auth-steps/step2-verify-code/step2-verify-code.component';

@Component({
  selector: 'app-forgot-main',
  imports: [CommonModule,Step1EmailComponent,Step2VerifyCodeComponent,Step3ResetPassComponent],
  templateUrl: './forgot-main.component.html',
  styleUrl: './forgot-main.component.css'
})
export class ForgotMainComponent {
  private platformId = inject(PLATFORM_ID);
  private isBrowser() { return isPlatformBrowser(this.platformId); }

  constructor(private service:ResetPasswordService,
    private router:Router
  ){}

  step:string='emailOtp';
  errorMessage:string='';
  loading:boolean=false;

  verifyToken!:string;
  verifiedToken!:string;
  email!:string;

  sendOtp(email:string){
    this.loading=true;
    this.service.sendOtp(email).subscribe({
      next:(res)=>{
        console.log(res);
        this.email=email;
        this.verifyToken=res.token;
        this.errorMessage='';

        this.loading=false;
        this.step='verifyOtp'
      },
      error:(err)=>{
        console.log(err);
        this.errorMessage=err.error.message;
        this.loading=false;
      }
    })
  }

  resendOtp(){
    this.service.sendOtp(this.email).subscribe({
      next:(res)=>{
        this.verifyToken=res.token;
        this.errorMessage='';

      },
      error:(err)=>{
        this.errorMessage=err.error.message;


      }
    })
  }

  verifyOtp(otp:number){
    this.loading=true;
    const body = {code:otp,token:this.verifyToken};
    this.service.verifyOtp(body).subscribe({
      next:(res)=>{
        console.log(res);
        this.verifiedToken=res.token;

        this.step='createNewPass';
        this.errorMessage='';
        this.loading=false;
      },
      error:(err)=>{
        console.log(err);
        this.loading=false;
        this.errorMessage= err.error.message;
      }
    })
  }

  createNewPass(passwords:{passwordFirst:string,passwordSecond:string}){
    this.loading=true;
    const body = {
      ...passwords,
      token:this.verifiedToken
    }
    this.service.createNewPass(body).subscribe({
      next:(res)=>{
        console.log(res);
        this.loading=false;


        //yönlendirme
        if(isPlatformBrowser(this.platformId)){
          this.router.navigate(['/login'],{
            state:{message:'Şifreniz başarıyla güncellendi'}
          });
        }
  
      },
      error:(err)=>{
        this.errorMessage=err.error.message;
        this.loading=false;

      }
    })
  }


}

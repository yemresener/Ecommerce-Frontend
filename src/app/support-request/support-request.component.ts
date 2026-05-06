import { Component,inject,effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupportRequestService } from '../Services/support-request.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AuthService } from '../core/services/auth.service';
import { BrowserAware } from '../shared/base/browser-aware';
import { SupportRequestInterface } from './support-request-interface';
import { MainToastComponent } from '../shared/components/toast/main-toast/main-toast.component';

declare const turnstile: any;

@Component({
  selector: 'app-support-request',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgxMaskDirective,MainToastComponent],
  templateUrl: './support-request.component.html',
  styleUrl: './support-request.component.css'
})

export class SupportRequestComponent extends BrowserAware{

    authService = inject(AuthService);

    user = this.authService.getUser();



  constructor(private service:SupportRequestService,private fb:FormBuilder){super()
    this.form = this.fb.group({
        fullname:['',[Validators.required,Validators.minLength(5)]],
        email:['',[Validators.required,Validators.email]],
        phone_number: ['', [Validators.pattern(/^(\+90|0)?5[0-9]{9}$/)]],
        order_id:[''],
        topic:['',[Validators.required,Validators.maxLength(100),Validators.minLength(10)]],
        contact_type:['email',[Validators.required]],
        message:['',[Validators.required,Validators.maxLength(500),Validators.minLength(10)]],

      })
      effect(() => {
        const userData = this.user();
        if (userData) {
          const fullName = userData.name +' ' + userData.surname;
          this.form.patchValue({
            fullname: fullName,
            email: userData.email,
            phone_number: userData.phone_number
          });
        }
      })

  }


  form:FormGroup;

  get fullname(){ return this.form.get('fullname')}
  get email(){ return this.form.get('email')}
  get phone_number(){ return this.form.get('phone_number')}
  get order_id(){ return this.form.get('order_id')}
  get topic(){ return this.form.get('topic')}
  get contact_type(){ return this.form.get('contact_type')}
  get message(){ return this.form.get('message')}


  loading=false;
  toastMessage='';
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  updateInfo(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    if(!this.turnstileToken) return;

    this.loading = true;
    const body:SupportRequestInterface = {
      user_id:this.user()?.id,
      order_id:this.form.get('order_id')?.value,
      contact_name:this.form.get('fullname')?.value,
      contact_email:this.form.get('email')?.value,
      contact_phone:this.form.get('phone_number')?.value,
      topic:this.form.get('topic')?.value,
      message:this.form.get('message')?.value,
      contact_preference:this.form.get('contact_type')?.value,
      cf_turnstile_response:this.turnstileToken
    }
    console.log(body)

    this.service.createRequest(body).subscribe({
      next:(res)=>{
        console.log(res);
        this.loading = false;
        this.toastMessage=res.message;
        this.status='success'
        this.order_id?.reset();
        this.topic?.reset();
        this.message?.reset();


        turnstile.reset();
      },
      error:(err)=>{
        console.log(err)
        this.loading = false;
        this.toastMessage=err.error.message;
        this.status='error'
      }
    })
  }


  turnstileToken: string | null = null;

  ngAfterViewInit(): void {
    if(!this.isBrowser()) return
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      turnstile.render('#turnstile-container', {
        sitekey: '1x00000000000000000000AA',
        callback: (token: string) => {
          this.turnstileToken = token;
        },
        'expired-callback': () => {
          this.turnstileToken = null;
        }
      });
    };
  }

}

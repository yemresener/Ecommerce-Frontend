import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValueChangeEvent } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBoxComponent } from '../../shared/components/error-box/error-box.component';
import { LoginService } from '../../Services/auth/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterLink,ReactiveFormsModule,ErrorBoxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  open_password=false;
  message!:string;
  title:string='';
  loginForm:FormGroup;
  loading:boolean=false;
  successMessage:string='';
  constructor(private fb:FormBuilder, private service:LoginService,private toast:ToastrService,private router:Router,@Inject(PLATFORM_ID) private platformId: Object){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(3)]]
    });
    if(isPlatformBrowser(this.platformId)){
      const nav = this.router.getCurrentNavigation();
      this.successMessage=nav?.extras?.state?.['message'] ?? null;
    }

  }
  get email() { return this.loginForm.get('email')};
  get password() {return this.loginForm.get('password')};

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading=true;
    this.service.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.loading=false;
        /*
        if(isPlatformBrowser(this.platformId)){
          this.router.navigate(['/home']);
        }
          */
      },
      error:(err)=>{
        console.log(err);
        this.message=err.error.message;
        this.loading=false;


      }
    })
    console.log(this.loginForm.value);
    
  }

  ngOnInit(){
    if(this.successMessage) {
      this.toast.success(this.successMessage);
    }
    
  }




}

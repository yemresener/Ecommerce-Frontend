import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValueChangeEvent } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBoxComponent } from '../../shared/components/error-box/error-box.component';
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

  constructor(private fb:FormBuilder){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }
  get email() { return this.loginForm.get('email')};
  get password() {return this.loginForm.get('password')};

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log(this.email?.value);
    
  }


}

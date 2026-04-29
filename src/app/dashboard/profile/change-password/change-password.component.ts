import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MainToastComponent } from '../../../shared/components/toast/main-toast/main-toast.component';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-change-password',
  imports: [CommonModule,FormsModule,ReactiveFormsModule,MainToastComponent,DeleteConfirmComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  constructor(private fb:FormBuilder,private service:AuthService){
    this.form = this.fb.group({
      oldPassword:['',[Validators.required]],
      newPassword:['',[Validators.required,Validators.minLength(8)]],
    })
  }

  form:FormGroup;

  get oldPassword() { return this.form.get('oldPassword'); }
  get newPassword() { return this.form.get('newPassword'); }

  showOldPassword = false;
  showNewPassword = false;
  loading=false;
  showUpdateConfrim=false;
  message='';
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  changePassword(){
    if(this.form.invalid){
      return;
    }
    this.loading=true;
    this.showUpdateConfrim=false;
    const body={
      password_old:this.oldPassword?.value,
      password_new:this.newPassword?.value
    }
    this.service.changePassword(body).subscribe({
      next:(res)=>{
        console.log(res);
        this.form.reset();
        this.loading=false;
        this.message=res.message;
        this.status='success';
      },
      error:(err)=>{
        console.log(err);
        this.form.reset();
        this.loading=false;
        this.status='error';
        this.message=err.error.message;
        
      }
    })

  }

  onSubmit(){
    if(this.form.invalid) return
    this.showUpdateConfrim=true;
   
  }

}

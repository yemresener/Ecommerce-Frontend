import { Component,inject,effect,computed,signal  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/user-service/auth.service';
import { MainToastComponent } from '../../../../shared/components/toast/main-toast/main-toast.component';
import { DeleteConfirmComponent } from '../../../../shared/components/delete-confirm/delete-confirm.component';
@Component({
  selector: 'app-user-info',
  imports: [CommonModule,ReactiveFormsModule,MainToastComponent,FormsModule,DeleteConfirmComponent],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  authService = inject(AuthService);
  userService = inject(AuthService);

  userInfo = this.authService.getUser();
  loading = false;
  message='';
  status:'success' | 'error' | 'warning' | 'info' = 'success';

  constructor(private fb:FormBuilder){
    this.infoForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      surname:['',[Validators.required,Validators.minLength(3)]],
    })
    this.comForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(/^(\+90|0)?5[0-9]{9}$/)]],
    })

    effect(() => {
      const user = this.userInfo();
      console.log(user);
      if (user) {
        this.infoForm.patchValue({
          name: user.name,
          surname: user.surname,
        });
        this.comForm.patchValue({
          email: user.email,
          phone_number: user.phone_number,
        });
      }
    });
  
  }
  infoForm:FormGroup;
  comForm:FormGroup;

  get name() { return this.infoForm.get('name'); }
  get surname() { return this.infoForm.get('surname'); }
  get email() { return this.comForm.get('email'); }
  get phone_number() { return this.comForm.get('phone_number'); }
  



  infoFormUnchanged():boolean  {
    const user = this.userInfo();
    if (!user) return true;
    
    return (
      this.infoForm.value.name === user.name &&
      this.infoForm.value.surname === user.surname
    );
  };
  
  comFormChanged():boolean{
    const user = this.userInfo();
    if (!user) return true;
    return (this.comForm.value.email === user.email)
    
  }

  updateInfo(){
    if(this.loading) return;
    if(this.infoFormUnchanged()) return;
    this.message='';
    this.loading=true;
    const body={
      name:this.infoForm.get('name')?.value,
      surname:this.infoForm.get('surname')?.value
    }
    this.authService.updateInfo(body).subscribe({
      next: (res) => {
        this.loading=false
        this.message=res.message
        
      },
      error: (err) => {
        
        this.loading=false
        this.message=err.error.message;
        this.status='error';
      }
    });
  }
  
  otpLoading=false;
  newEmail:string='';
  token:string='';
  otpMessage:string='';
  showOtpModal=false;
  otp:string='';
  sendOtp(){
    this.showDeleteConfirm=false;
    if(this.otpLoading) return;
    console.log(this.comForm.value.email === this.userInfo()?.email)
    if(this.comFormChanged()) return;
    console.log('SALAMLAR');
    this.otpLoading=true;

    this.newEmail=this.comForm.value.email;
    const body = {email:this.newEmail}
    this.authService.sendOtp(body).subscribe({
      next:(res)=>{
        console.log(res);
        this.token =res.token;
        this.otpMessage=res.message;
        this.otpLoading=false;
        this.showOtpModal=true;
  
      },
      error:(err)=>{
        console.log(err);
        this.otpLoading=false;
        this.message=err.error.message;
        this.status='error';
      }
    })
  }

  otpError:string='';
  updateEmail(){
    console.log(this.token,this.otp);
    this.otpError='';
    if(!this.token){
      this.message='Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    };
    if(!this.otp || this.otp.length<5) return;
    this.otpLoading=true;

    const body={
      token:this.token,
      code:this.otp
    }
    this.authService.confirmAndUpdateEmail(body).subscribe({
      next:(res=>{
        console.log(res);
        this.message='E-posta adresi güncellendi.';
        this.status='success';
        this.showOtpModal=false;
        this.otpLoading=false;

      }),
      error:(err)=>{
        console.log(err);
        this.otpError=err.error.message;
        this.status='error';
        this.otpLoading=false;

      }
    })
  }

  showDeleteConfirm = false;
  confirmMessage = 'Aktif e-posta adresiniz silinecek.';
  showDeleteModal(){
    this.showDeleteConfirm = true;
  }

  onDeleteCancel(){
    this.showDeleteConfirm = false;
  }

}


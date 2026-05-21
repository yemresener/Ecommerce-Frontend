import { Component,Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBase } from '../../../shared/base/error-base';
import { ErrorBoxComponent } from '../../../shared/components/error-box/error-box.component';
@Component({
  selector: 'app-step3-reset-pass',
  imports: [CommonModule,ReactiveFormsModule,ErrorBoxComponent],
  templateUrl: './step3-reset-pass.component.html',
  styleUrl: './step3-reset-pass.component.css'
})
export class Step3ResetPassComponent extends ErrorBase {

  @Output() resetPass= new EventEmitter<any>();
  @Input() loading:boolean=false;

  resetForm:FormGroup;
  constructor(private fb:FormBuilder){
    super();
    this.resetForm=this.fb.group({
      passwordFirst:['',[Validators.required,Validators.minLength(6)]],
      passwordSecond:['',[Validators.required,Validators.minLength(6)]],

    },{validators:this.passwordMatch})
  }
  get passwordFirst() {return this.resetForm.get('passwordFirst')};
  get passwordSecond() {return this.resetForm.get('passwordSecond')};


  passwordMatch = (form:AbstractControl)=>{
    const first = form.get('passwordFirst')?.value;
    const second = form.get('passwordSecond')?.value;
    return first === second ? null : { passwordMismatch: true };  }

  onSubmit(){
    if(this.resetForm.invalid){
      this.resetForm.markAllAsTouched();
      return;
    }
    
    this.resetPass.emit(this.resetForm.value)
  }
}

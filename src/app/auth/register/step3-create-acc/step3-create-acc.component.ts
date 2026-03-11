import { Component,Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBase } from '../../../shared/base/error-base';
import { ErrorBoxComponent } from '../../../shared/components/error-box/error-box.component';
@Component({
  selector: 'app-step3-create-acc',
  imports: [CommonModule,ReactiveFormsModule,ErrorBoxComponent],
  templateUrl: './step3-create-acc.component.html',
  styleUrl: './step3-create-acc.component.css'
})
export class Step3CreateAccComponent extends ErrorBase {
  @Output() createAcc= new EventEmitter<any>();
  @Input() loading:boolean=false;

  registerForm:FormGroup;
  constructor(private fb:FormBuilder){
    super();
    this.registerForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      surname:['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      phone_number:['',[Validators.pattern(/^(\+90|0)?5[0-9]{9}$/)]]

    })
  }
  get name() {return this.registerForm.get('name')};
  get surname() {return this.registerForm.get('surname')};
  get password() {return this.registerForm.get('password')};
  get phone_number() {return this.registerForm.get('phone_number')};


  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.createAcc.emit(this.registerForm.value)
  }
}

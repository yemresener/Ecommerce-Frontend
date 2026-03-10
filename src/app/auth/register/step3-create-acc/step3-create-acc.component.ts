import { Component, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-step3-create-acc',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './step3-create-acc.component.html',
  styleUrl: './step3-create-acc.component.css'
})
export class Step3CreateAccComponent {
  @Output() createAcc= new EventEmitter<any>();

  registerForm:FormGroup;
  constructor(private fb:FormBuilder){
    this.registerForm=this.fb.group({
      name:['',[Validators.required,Validators.minLength(2)]],
      surname:['',[Validators.required,Validators.minLength(2)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  get name() {return this.registerForm.get('name')};
  get surname() {return this.registerForm.get('surname')};
  get password() {return this.registerForm.get('password')};

  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    
    this.createAcc.emit(this.registerForm)
  }
}

import { Component,inject } from '@angular/core';
import { SavedCardListComponent } from '../saved-card-list/saved-card-list.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { BrowserAware } from '../../shared/base/browser-aware';
import { CreditCardInterface } from '../../interfaces/payment/creditCard/credit-card-interface';
import { MainToastComponent } from '../../shared/components/toast/main-toast/main-toast.component';
import { FullpageLoaderComponent } from '../../shared/fullpage-loader/fullpage-loader.component';
import { DeleteConfirmComponent } from '../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-saved-card',
  imports: [SavedCardListComponent,SavedCardListComponent,CommonModule,MainToastComponent,
    FullpageLoaderComponent,DeleteConfirmComponent],
  templateUrl: './saved-card.component.html',
  styleUrl: './saved-card.component.css'
})
export class SavedCardComponent extends BrowserAware{
  service = inject(AuthService);

  constructor(){super()}
  savedCards = this.service.getSavedCards();

  ngOnInit(): void {
    console.log(this.savedCards());
    if(this.isBrowser()){
      if(!this.savedCards()?.length){
        this.firstLoading=true;
        this.service.callSavedCards().subscribe({
          next: () => {
            this.firstLoading = false; 
            console.log('FALSE OLDUK KANKAM');
          },
          error: () => {
            this.firstLoading = false;
            console.log('FALSE OLDUK KANKAM - ERROR');

          }
        });
      }
    }
  }
  
  firstLoading =false;
  loading=false;
  status: 'success' | 'error' | 'warning' | 'info' = 'success';
  message='';
  updateToDefault(card:CreditCardInterface){
    this.message='';
      if(card.id){
        this.loading=true;
        this.service.updateCardToDefault(card.id).subscribe({
          next:(res)=>{
              this.message=res.message;
              this.status='success';
              this.loading=false;

          },
          error:(err)=>{
            this.message=err.error.message;
            this.status='error';
            this.loading=false;

          }
        })
      }

  }

  selectedCardId?:number
  showDeleteConfirm=false;
  
  onDeleteCard(card:CreditCardInterface){
    this.selectedCardId=card.id;
    this.showDeleteConfirm=true;
  }

  onDeleteCancel(){
    this.selectedCardId=undefined;
    this.showDeleteConfirm=false;
  }

  deleteCard(){
    if(!this.selectedCardId) return;
    this.showDeleteConfirm=false;
    this.loading=true;
    this.service.deleteCard(this.selectedCardId).subscribe({
      next:(res)=>{
        this.message=res.message;
        this.status='success';
        this.loading=false;

      },
      error:(err)=>{
        this.message=err.error.message;
        this.status='error';
        this.loading=false;

      }
    })
  }

}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MiniAdvert } from '../../../../interfaces/mini-advert';
import { CartService } from '../../../../Services/cart.service';
import { CartToastComponent } from '../../toast/cart-toast/cart-toast.component';
import { MainToastComponent } from '../../toast/main-toast/main-toast.component';
@Component({
  selector: 'app-card',
  imports: [CommonModule,RouterLink,RouterOutlet,CartToastComponent,MainToastComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  constructor(private service:CartService){}
  @Input() item!:MiniAdvert;
  @Input() itemSize:number=0;
  @Input() skeleton:boolean=false;


  cartItemAdded=false;
  cartMessage='';
  cartErrorMessage='';
  cartLoading?:number;
  selectedAdvert!:MiniAdvert

  addToCart(advert:MiniAdvert){
    this.cartLoading=advert.id;
    console.log(advert,'ADVERT');
    this.cartErrorMessage='';
    this.cartMessage=''

    this.service.addCart(advert.slug).subscribe({
      next:(res)=>{
        this.cartItemAdded=true;
        this.cartMessage=res.message;
        this.selectedAdvert=advert;
        this.cartLoading=undefined;

      },
      error:(err)=>{
        console.log(err)
        this.cartLoading=undefined;

        this.cartErrorMessage=err.error.message;
      }
    })
  }
}

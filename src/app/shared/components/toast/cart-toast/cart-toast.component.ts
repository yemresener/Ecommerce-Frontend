import { Component,Input,PLATFORM_ID,inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MiniAdvert } from '../../../../interfaces/mini-advert';
import { BrowserAware } from '../../../base/browser-aware';
BrowserAware
@Component({
  selector: 'app-cart-toast',
  imports: [CommonModule],
  templateUrl: './cart-toast.component.html',
  styleUrl: './cart-toast.component.css'
})
export class CartToastComponent extends BrowserAware {
  @Input() item!:MiniAdvert;
  @Input() message?:string;
  
  visible=true;
  hiding=false;
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      setTimeout(() => this.close(), 3000);

    }
    }

  close(){
    this.hiding=true;
     if(isPlatformBrowser(this.platformId)){
      setTimeout(() => this.visible = false, 300);

    }
  }

}

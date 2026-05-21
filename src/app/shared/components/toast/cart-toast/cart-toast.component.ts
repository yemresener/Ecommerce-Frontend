import { Component,Input,PLATFORM_ID,inject,ElementRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MiniAdvert } from '../../../../features/advert/interfaces/mini-advert';
import { BrowserAware } from '../../../base/browser-aware';
import { Router } from '@angular/router';
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
  constructor(private router:Router,private el: ElementRef){super()}
  visible=true;
  hiding=false;

  ngOnInit(){
    if(this.isBrowser()){
      document.body.appendChild(this.el.nativeElement);

      setTimeout(() => this.close(), 3000);

    }
    }

  close(){
    this.hiding=true;
     if(this.isBrowser()){
      setTimeout(() => this.visible = false, 300);
      this.el.nativeElement.remove();

     }

  }

  cartBtn(){
    this.close();
    this.router.navigate(['/cart']);
  }

}

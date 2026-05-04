import { Component,Input,Output ,EventEmitter,ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAware } from '../../../base/browser-aware';
@Component({
  selector: 'app-main-toast',
  imports: [CommonModule],
  templateUrl: './main-toast.component.html',
  styleUrl: './main-toast.component.css'
})
export class MainToastComponent extends BrowserAware{
  constructor(private el: ElementRef) {
    super();
  }
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Input() title!: string;
  @Input() message!: string;

  @Output() closed = new EventEmitter();
  
  visible = true;
  hiding = false;

  ngOnInit(){
    if(this.isBrowser()){
      document.body.appendChild(this.el.nativeElement);

      setTimeout(() => this.close(), 3000);

    }
    }

    close(){
      this.hiding = true;
      setTimeout(() => {
        this.visible = false;
        this.closed.emit(); 
      }, 500);
      if (this.isBrowser()) {
        this.el.nativeElement.remove();
      }
    }

get icon(){
  const icons = {
    success: '✓',
    error: '!',
    warning: '⚠',
    info: 'i'
  }
  return icons[this.type];
}

}

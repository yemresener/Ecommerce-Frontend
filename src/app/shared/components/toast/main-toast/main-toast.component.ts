import { Component,Input,Output ,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAware } from '../../../base/browser-aware';
@Component({
  selector: 'app-main-toast',
  imports: [CommonModule],
  templateUrl: './main-toast.component.html',
  styleUrl: './main-toast.component.css'
})
export class MainToastComponent extends BrowserAware{
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Input() title!: string;
  @Input() message!: string;

  @Output() closed = new EventEmitter();
  
  visible = true;
  hiding = false;

  ngOnInit(){
    if(this.isBrowser()){
      setTimeout(() => this.close(), 3000);

    }
    }

    close(){
      this.hiding = true;
      setTimeout(() => {
        this.visible = false;
        this.closed.emit(); 
      }, 300);
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

import { Component,Input  } from '@angular/core';
import { SliderModel } from './slider.model';
import { CommonModule } from '@angular/common';
import { BrowserAware } from '../../base/browser-aware';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent<T> extends BrowserAware{

  @Input() slider!: SliderModel<T>;
  @Input() itemWidth= 242;
  @Input() type='';

  @Input() autoPlay = false;
  @Input() intervalMs = 5000;
  private autoPlayTimer: any;
  isHovered = false;
  ngOnInit() {
    if (this.autoPlay && this.isBrowser()) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay(); // Component yok olduğunda intervali temizle (Memory leak'i önler)
  }

  startAutoPlay() {
    if (this.autoPlayTimer) return; // Zaten çalışıyorsa tekrar başlatma

    this.autoPlayTimer = setInterval(() => {
      // Sadece kullanıcı sürüklemiyorsa VE mouse slider'ın üzerinde değilse kaydır
      if (!this.isDragging && !this.isHovered) {
        this.next();
      }
    }, this.intervalMs);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  maxIndex(){
    return Math.max(0, this.slider.items.length - this.slider.visible); 
  }

  next(){
    if(this.type==='main'){
      return this.nextMobile();
    }
    const max = this.maxIndex(); 
    this.slider.index = Math.min( 
      this.slider.index + this.slider.visible,
      max //8
    );

    console.log('slidercount',this.slider.index)
  }

  prev(){
    if(this.type==='main'){
      return this.prevMobile();
    }
    this.slider.index = Math.max(
      this.slider.index - this.slider.visible,
      0
    )
  }

  getTransform(){
    if(this.type==='main'){
      return `translateX(-${this.slider.index * 100}%)`;

    }
    return `translateX(-${this.slider.index * (this.itemWidth)}px)`;
  }


  isDragging = false;
  startX = 0;
  scrollLeft = 0;
  
  onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    const slider = e.currentTarget as HTMLElement;
  
    this.startX = e.pageX - slider.offsetLeft;
    this.scrollLeft = slider.scrollLeft;
  
    slider.classList.add('dragging');
  }
  
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
  
    e.preventDefault();
    const slider = e.currentTarget as HTMLElement;
  
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - this.startX) * 1.2; // hız çarpanı
    slider.scrollLeft = this.scrollLeft - walk;
  }
  
  onMouseUp() {
    this.isDragging = false;
    document
      .querySelector('.slider-window-best')
      ?.classList.remove('dragging');
  }

/* MOBILE */

nextMobile() {
  const len = this.slider.items.length; 
  if (!len) return;
  if (this.slider.index === len - 1) {
    this.slider.index = 0;
  } else {
    this.slider.index++; 
  }
}

prevMobile() {
  const len = this.slider.items.length;
  if (!len) return;
  
  if (this.slider.index === 0) {
    this.slider.index = len - 1;
  } else {
    this.slider.index--;
  }

}





  touchStartX=0;
  touchEndX=0;

  onTouchStart(event:TouchEvent){
    if (this.type !== 'main') return;
    this.touchStartX=event.touches[0].clientX;
  }
  onTouchEnd(event:TouchEvent){
    if (this.type !== 'main') return;
    this.touchEndX=event.changedTouches[0].clientX;
    this.handleSwipe();
  }
  handleSwipe(){
    const diff = this.touchStartX - this.touchEndX;
    console.log('tip',this.type?? +'mal')
    if(Math.abs(diff)<10) return;
    if(diff>0){
      this.nextMobile();
    }
    else{
      this.prevMobile();
    }
  }



}

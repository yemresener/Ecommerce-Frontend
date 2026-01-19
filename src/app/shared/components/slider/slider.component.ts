import { Component,Input  } from '@angular/core';
import { SliderModel } from './slider.model';


@Component({
  selector: 'app-slider',
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent<T> {

  @Input() slider!: SliderModel<T>;
  @Input() itemWidth= 242;
  @Input() type='';
  maxIndex(){
    return Math.max(0, this.slider.items.length - this.slider.visible); 
  }

  next(){
    const max = this.maxIndex(); 
    this.slider.index = Math.min( 
      this.slider.index + this.slider.visible,
      max //8
    );

    console.log('slidercount',this.slider.index)
  }

  prev(){
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

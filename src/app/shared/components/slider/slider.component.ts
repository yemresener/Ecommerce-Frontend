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

  maxIndex(){
    return Math.max(0, this.slider.items.length - this.slider.visible);
  }

  next(){
    const max = this.maxIndex();
    this.slider.index = Math.min(
      this.slider.index + this.slider.visible,
      max
    );
  }

  prev(){
    this.slider.index = Math.max(
      this.slider.index - this.slider.visible,
      0
    )
  }

  getTransform(){
    return `translateX(-${this.slider.index * this.itemWidth}px)`;
  }
}

import { Component,Input,SimpleChanges } from '@angular/core';
import { SliderModel, } from '../../../shared/components/slider/slider.model';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
 import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-main-slider',
  imports: [SliderComponent,CommonModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {
  @Input() items:any[]=[];

  mainSlider!: SliderModel<any>;

  ngOnChanges(changes:SimpleChanges):void {
    if(changes['items']&& this.items?.length){
      this.mainSlider={
        items:this.items,
        index:0,
        visible:1
      }
      console.log('main',this.items)
    }
  }

}

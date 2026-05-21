import { Component,Input,SimpleChange,SimpleChanges } from '@angular/core';
import { SliderModel } from '../slider/slider.model';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
@Component({
  selector: 'app-category-slider',
  imports: [CommonModule,SliderComponent],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent  {
  @Input() title!: string;
  @Input() items: any[] = [];
  @Input() skeleton:boolean=false;

  sliderItems: any[] = [];
  categorySlider: SliderModel<any> = {
    items: [],
    index: 0,
    visible: 5
  };
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['items'] && this.items?.length){

      this.categorySlider={
        items:this.items,
        index:0,
        visible:5,
      }
      console.log('Category oluşturuldu',this.categorySlider);
    }
  }


  loadedImages = new Set<string>();

  onImgLoad(src: string) {
    this.loadedImages.add(src);
  }

}

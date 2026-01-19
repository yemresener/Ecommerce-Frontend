import { Component,Input,SimpleChange,SimpleChanges } from '@angular/core';
import { SliderModel } from '../../../shared/components/slider/slider.model';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
@Component({
  selector: 'app-category-slider',
  imports: [CommonModule,SliderComponent],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.css'
})
export class CategorySliderComponent  {
  @Input() title!: string;
  @Input() items: any[] = [];

  categorySlider!: SliderModel<any>;

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

}

import { Component,Input,OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { SliderModel } from '../slider/slider.model';
import { CardComponent } from '../../product/card/card.component';
import { MiniAdvert } from '../../../../features/advert/interfaces/mini-advert';
@Component({
  selector: 'app-product-slider',
  imports: [SliderComponent,CardComponent,CommonModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent  implements OnChanges{
  
  @Input() title!:string;
  @Input() items:MiniAdvert[]=[];
  @Input() sectionType!:string;
  @Input() skeleton:boolean=true;
  
  productSlider!: SliderModel<any>;
  skeletonItems = Array(5).fill(null);
  skeletonSlider: SliderModel<any> = {
    items: this.skeletonItems,
    index: 0,
    visible: 5
  };
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items'] && this.items?.length) {
      this.productSlider = {
        items: this.items,
        index: 0,
        visible: 5
      };

      console.log('PRODUCT SLIDER OLUŞTU:', this.productSlider);
    }
  }
}

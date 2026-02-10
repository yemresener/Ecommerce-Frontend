import { Component,Input,OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from '../../../shared/components/slider/slider.component';
import { SliderModel } from '../../../shared/components/slider/slider.model';
import { CardComponent } from '../../../shared/components/product/card/card.component';
import { MiniAdvert } from '../../../interfaces/mini-advert';
@Component({
  selector: 'app-product-section',
  imports: [SliderComponent,CardComponent,CommonModule],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.css'
})
export class ProductSectionComponent  implements OnChanges {
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

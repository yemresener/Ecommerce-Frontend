import { Component,EventEmitter,Input,Output,OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { CategoryNodeComponent } from '../category-node/category-node.component';
@Component({
  selector: 'app-filter',
  imports: [CommonModule,FormsModule,CategoryNodeComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() activeCategory!:Category;
  @Input() category_tree!:Category;
  @Input() priceFilter?: { min?: number; max?: number };


  @Output() applyPrice = new EventEmitter<{ min?: number; max?: number }>();

  categoryOpen:boolean=true;
  priceOpen:boolean=true;
  draftMin?: number;
  draftMax?: number;



  ngOnChanges(changes: SimpleChanges) {
    if (changes['priceFilter']) {
      this.draftMin = this.priceFilter?.min;
      this.draftMax = this.priceFilter?.max;
    }
  }

  applyPrices(){
    console.log(this.draftMin,this.draftMax,'PRİCES KANKA')

    if (
    this.draftMin != null &&
    this.draftMax != null &&
    this.draftMin > this.draftMax
  ) {
    [this.draftMin, this.draftMax] = [this.draftMax, this.draftMin];
  }
    this.emit();
  }

  removePrice(){

    this.draftMin=undefined;
    this.draftMax=undefined;
    this.emit();
  }

  private emit() {
    this.applyPrice.emit({
      min: this.draftMin,
      max: this.draftMax
    });
  }
}

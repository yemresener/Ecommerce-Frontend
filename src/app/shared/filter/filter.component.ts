import { Component,EventEmitter,Input,Output,OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../features/category/interfaces/category';
import { CategoryNodeComponent } from '../../features/category/category-node/category-node.component';
import { Navbar } from '../layouts/navbar/navbar';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-filter',
  imports: [CommonModule,FormsModule,CategoryNodeComponent,RouterLink],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  @Input() activeCategory?:Category;
  @Input() category_tree?:Category;
  @Input() priceFilter?: { min?: number; max?: number };
  @Input() categories?:Navbar[];


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
    console.log(this.priceFilter,'PRICE FILTER');
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
    console.log('UNDEFINED YAPILDı')
    this.emit();
  }

  private emit() {
    this.applyPrice.emit({
      min: this.draftMin,
      max: this.draftMax
    });
  }
}

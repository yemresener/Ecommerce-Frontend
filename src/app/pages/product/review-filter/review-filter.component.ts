import { Component,Output,EventEmitter } from '@angular/core';
import { FilterParams } from '../../../interfaces/filter-params';
@Component({
  selector: 'app-review-filter',
  imports: [],
  templateUrl: './review-filter.component.html',
  styleUrl: './review-filter.component.css'
})
export class ReviewFilterComponent {
  @Output() filterChange = new EventEmitter<FilterParams>();


  custom:boolean=false;
  filterLabel:string='Puan seç';
  lastValue: number | null = null;
  filterParams:FilterParams={};

  targetValue(value:number){
    console.log(value);
    if (this.lastValue === value) {
      this.lastValue = null;
      this.filterLabel = 'Puan seç';
      delete this.filterParams.rating;
      console.log(this.filterParams)
    } else {
      this.lastValue = value;
      this.filterLabel = `⭐ ${value}`;
      this.filterParams.rating = value;
      console.log(this.filterParams)

    }
  
    this.custom = false;

    this.filterChange.emit(this.filterParams);
  }

}

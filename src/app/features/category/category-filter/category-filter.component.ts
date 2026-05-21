import { Component,Input,Output,EventEmitter,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortOption } from '../../../interfaces/sort-option';
import { FilterParams } from '../../../shared/filter/filter-params';
import { FilterLabelServiceService } from '../../../NoApiServices/filter-label-service.service';
@Component({
  selector: 'app-category-filter',
  imports: [CommonModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})
export class CategoryFilterComponent {
  constructor (private labelService:FilterLabelServiceService){}


  @Output() filterChange = new EventEmitter<FilterParams>();
  @Input() filters!: FilterParams;


  private filterParams: FilterParams = {};
  @HostListener('document:click')
  closeAll() {
    this.sortOption = false;
}

  ngOnChanges(): void {
   
    this.sortLabel = this.labelService.labelOnChanges(this.filters,this.sortOptions);

    this.filterParams = {
      ...this.filters,        
      sort_by: this.filters?.sort_by,
      order: this.filters?.order,
    };
    
    
  }


  selectSort(option:SortOption){
    const same = this.sortLabel===option.label;
    if(same){
      this.sortLabel= 'Sıralama Seç';
      delete this.filterParams.sort_by;
      delete this.filterParams.order;
      console.log(this.filterParams,'PARAMS');
    }else{
      this.sortLabel=option.label;
      this.filterParams.sort_by=option.value.sort_by;
      this.filterParams.order=option.value.order;
      console.log(this.filterParams,'PARAMS');

    }
    this.sortOption=false;
    console.log(this.sortOption,'option')
    this.emit();

  }

  sortOption=false;
  sortLabel='Sıralama Seç';

  sortOptions:SortOption[] = [
    { label: 'En düşük fiyat', value: { sort_by: 'price', order: 'asc' } },
    { label: 'En yüksek fiyat', value: { sort_by: 'price', order: 'desc' } },
    { label: 'Yüksek puanlılar', value: { sort_by: 'avg_rating', order: 'desc' } }
  ];

  private emit(){
    this.filterChange.emit({...this.filterParams})
  }



}

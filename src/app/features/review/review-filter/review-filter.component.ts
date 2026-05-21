  import { Component,Output,EventEmitter,Input,HostListener } from '@angular/core';
  import { FilterParams } from '../../../shared/filter/filter-params';
  import { CommonModule } from '@angular/common';
  import { ReviewStats } from '../interfaces/review-stats';

  interface RatingOption {
    label: string;
    rating: number;
    stats: number;
  }
  
  interface SortOption {
    label: string;
    value: {
      sort_by: string;
      order: 'asc' | 'desc';
    };
  }

  @Component({
    selector: 'app-review-filter',
    imports: [CommonModule],
    templateUrl: './review-filter.component.html',
    styleUrl: './review-filter.component.css'
  })
  export class ReviewFilterComponent {
    @Output() filterChange = new EventEmitter<FilterParams>();

    @Input() stats!:ReviewStats;
    @Input() filters!: FilterParams;


    ngOnChanges() {
      if (!this.filters) return;
    
      // rating
      this.selectedRating = this.filters.rating ?? null;
    
      if (this.selectedRating) {
        const found = this.ratingOptions.find(r => r.rating === this.selectedRating);
        this.filterLabel = found?.label ?? 'Puan seç';

      } else {
        this.filterLabel = 'Puan seç';
      }
    
      // sort
      if (this.filters.sort_by && this.filters.order) {
        const found = this.sortOptions.find(
          s => s.value.sort_by === this.filters.sort_by &&
               s.value.order === this.filters.order
        );
        this.sortLabel = found?.label ?? 'Sıralama seç';
      } else {
        this.sortLabel = 'Sıralama seç';
      }
    
      // internal state sync
      this.filterParams = { ...this.filters };
    }


    sortOption:boolean=false;
    custom:boolean=false;

    filterLabel:string='Puan seç';
    sortLabel:string='Sıralama seç'  

    selectedRating:number|null=null;

    private filterParams: FilterParams = {};

    @HostListener('document:click')
    closeAll() {
      this.custom = false;
      this.sortOption = false;
  }

    get ratingOptions():RatingOption[]  {
      return [
        {label:'Çok iyi', stats:this.stats?.five ?? 0, rating:5},
        {label:'İyi', stats:this.stats?.four ?? 0, rating:4},
        {label:'Ortalama', stats:this.stats?.three ?? 0, rating:3},
        {label:'Kötü', stats:this.stats?.two ?? 0, rating:2},
        {label:'Çok kötü', stats:this.stats?.one ?? 0, rating:1}
      ];
    }
    selectRating(item:RatingOption){
      this.selectedRating =
      this.selectedRating === item.rating ? null : item.rating;

      if(this.selectedRating){
        this.filterLabel=item.label;
        this.filterParams.rating=item.rating
      }
      else{
        this.filterLabel = 'Puan seç';
        delete this.filterParams.rating;
      }
      this.custom = false;
      this.emit();
    }


    /* SORT */

    sortOptions:SortOption[] = [
      { label: 'En yeni', value: { sort_by: 'created_at', order: 'desc' } },
      { label: 'En eski', value: { sort_by: 'created_at', order: 'asc' } },
      { label: 'Puana göre artan', value: { sort_by: 'rating', order: 'asc' } },
      { label: 'Puana göre azalan', value: { sort_by: 'rating', order: 'desc' } }
    ];
    selectSort(option:SortOption){
      const same = this.sortLabel ===option.label;
      if(same){
        this.sortLabel = 'Sıralama seç';
        delete this.filterParams.sort_by;
        delete this.filterParams.order;    
      }
      else{
        this.sortLabel = option.label;
        this.filterParams.sort_by = option.value.sort_by;
        this.filterParams.order = option.value.order;
      }
      this.sortOption = false;
      this.emit();
    }


    selectSortRating(item:SortOption){
      if(item.value.sort_by==='rating' && this.selectedRating) return;
      this.selectSort(item);

    }




    private emit(){
      this.filterChange.emit({ ...this.filterParams });
    }

  }

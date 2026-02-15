import { Injectable } from '@angular/core';
import { FilterParams } from '../interfaces/filter-params';
import { SortOption } from '../interfaces/sort-option';

@Injectable({
  providedIn: 'root'
})
export class FilterLabelServiceService {

  constructor() { }

  labelOnChanges(filters:FilterParams,options:SortOption[]):string{
    if(!filters) return '';

    if(filters.sort_by && filters.order){
      const found = options.find(
        s=>s.value.sort_by === filters.sort_by &&
        s.value.order === filters.order
      );
      return found?.label ?? 'Sıralama Seç';
    }else{
      return 'Sıralama Seç';
    }

  }

}

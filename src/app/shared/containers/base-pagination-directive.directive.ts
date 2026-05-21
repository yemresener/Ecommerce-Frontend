import { Directive } from '@angular/core';
import { PaginationMeta } from '../../interfaces/pagination-meta';

@Directive({
  selector: '[appBasePaginationDirective]'
})
export abstract class BasePaginationDirectiveDirective<T> {
  protected abstract fetchData(page:number):void;

  meta!:PaginationMeta;
  items:T[]=[];
  loading=true;
  isLoading=false;

  protected triggerFetch(reset=false){
    if(this.loading) return;
    if(!reset && this.meta && this.meta.current_page >=this.meta.last_page) return

    this.loading =true;
    const page = reset ? 1 : (this.meta?.current_page ?? 0) +1;
    this.fetchData(page);
    
  }

  protected handleSuccess(data: T[], meta: PaginationMeta, reset: boolean){
    this.items = reset ? data :[...this.items,...data];
    this.meta = meta;
    this.loading=false;
    this.isLoading=false;
  }

  loadMore() {
    this.triggerFetch(false);
    this.isLoading=true;
  }


}

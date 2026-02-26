import { Component, ViewChild,ElementRef,ViewChildren,QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSliderComponent } from '../components/sections/product-slider/product-slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../Services/list.service';
import { CategoryFilters } from '../interfaces/category-filters';
import { MiniAdvert } from '../interfaces/mini-advert';
import { Category } from '../interfaces/category';
import { BreadCrumb } from '../interfaces/bread-crumb';
import { CategoryNodeComponent } from '../shared/category-node/category-node.component';
import { PaginationMeta } from '../interfaces/pagination-meta';
import { CategoryFilterComponent } from '../shared/category-filter/category-filter.component';
import { FilterParams } from '../interfaces/filter-params';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FilterComponent } from '../shared/filter/filter.component';
@Component({
  selector: 'app-list-items',
  imports: [CommonModule,FormsModule,RouterModule,CardComponent,FilterComponent,CategoryNodeComponent,CategoryFilterComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  @ViewChild('scrollAnchor') anchor!: ElementRef;

  @ViewChildren('pageBlock') pageBlocks!: QueryList<ElementRef>;
  private pageObserver!: IntersectionObserver;

  constructor(private router:Router,
    private route:ActivatedRoute,
    private service:ListService
  ){}

  categoryOpen = true;
  priceOpen=true;
  brandOpen= true;
  sortOption=false;
  slug!:string;

  mobileFilter:boolean=false;


  private observer!: IntersectionObserver;
  activePage!: number;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(enter=>{
      if(enter[0].isIntersecting){
        this.loadMore();
        
      }
    },{threshold:0.2})
    this.observer.observe(this.anchor.nativeElement);
    
    this.pageObserver = new IntersectionObserver(entries=>{

      entries.forEach(entry=>{
        if(entry.isIntersecting){

          const page = Number(
            entry.target.getAttribute('data-page')
          );
          if (this.activePage !== page) {
            this.activePage = page;
            if(page===1){
              this.updateUrlPage(null);
              return
            }
            this.updateUrlPage(page);
          }
        }
      })
    },{
      threshold: 0.7
    });
    this.pageBlocks.changes.subscribe(() => {
      this.observePages();
    });
    
  }

  private observePages() {
    this.pageBlocks.forEach(block => {
      this.pageObserver.observe(block.nativeElement);
    });
  }


  ngOnInit(): void {
    this.pages = [
      {
        page: 0,
        items: this.skeletonItems,
      }
    ];
    combineLatest([
      this.route.paramMap,
      this.route.queryParams
    ]).pipe(debounceTime(0))
    
    
    .subscribe(([params, query]) => {
    
      const slug = params.get('slug') ?? '';
      const page = Number(query['page'] ?? 1);
    
      const filters: FilterParams = {};
    
      if (query['sort_by']) filters.sort_by = query['sort_by'];
      if (query['order']) filters.order = query['order'];
    
      if (query['min_price'] != null && query['min_price'] !== '') {
        filters.min_price = Number(query['min_price']);
        this.min_price = filters.min_price;
        this.active_min = filters.min_price;
      }
    
      if (query['max_price'] != null && query['max_price'] !== '') {
        filters.max_price = Number(query['max_price']);
        this.max_price = filters.max_price;
        this.active_max = filters.max_price;
      }
    
      const slugChanged = this.slug !== slug;
      const filtersChanged =
        JSON.stringify(filters) !== JSON.stringify(this.currentFilters);
    

      if (slugChanged || filtersChanged || !this.meta) {
    
        this.slug = slug;
        this.currentFilters = filters;
        if(slugChanged) this.breadSkeleton=true
        this.resetState();
        this.getCategoryTree();
        this.fetchAdverts(true, page);
      }
    });
  }
  breadSkeleton:boolean=false;
  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.pageObserver?.disconnect();
  }
  private resetState() {
    this.pages = [{
      page: 0,
      items: this.skeletonItems
    }];
    this.oldMeta=this.meta;
    this.meta = undefined!;
    this.minPageLoaded = 1;
    this.maxPageLoaded = 1;
    this.isLoading = true;
    this.loading = false;
  
    window.scrollTo({ top: 0 });
  }


  category_tree!:Category;
  breadcrumb!:BreadCrumb[];
  activeCategory!:Category;
  adverts!: MiniAdvert[];
  meta!:PaginationMeta;
  oldMeta!:PaginationMeta;
  getCategoryTree(){
    this.service.category(this.slug).subscribe({
      next:(res)=>{
        this.category_tree=res.filters.category_tree;
        this.breadcrumb=res.filters.breadcrumb;
        this.activeCategory=res.filters.active_category;
        //console.log(this.activeCategory,'ACTİVE')
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  currentFilters: FilterParams = {};
  skeletonItems = Array(12).fill(null);

  
  minPageLoaded:number=1;
  maxPageLoaded:number=1;
  isLoading =true;
  loading=false;
  pages: { page: number; items: MiniAdvert[] }[] = [];

  fetchAdverts(reset=false,forcedPage?:number){
    if(this.loading) return;
    if (!reset && (!this.meta || this.meta.current_page >= this.meta.last_page)) {
      return;
    }
    this.loading=true;

    const page = forcedPage 
    ?? (reset ? 1 : (this.meta?.current_page ?? 0) + 1);

    this.maxPageLoaded=page;
    if(forcedPage && forcedPage > 1){
      this.minPageLoaded=forcedPage;
    }
    //console.log(this.currentFilters,'CURRENT FILTERS FETCH')
    this.service.adverts({
      slug:this.slug,
      ...this.currentFilters,
      page

    }).subscribe({
      next:res=>{
      this.adverts = reset ? res.data : [...this.adverts,...res.data];
      if(reset){
        this.pages=[{
          page,
          items:res.data
        }]
      }else{
        this.pages.push({
          page,
          items:res.data
        })
      }
      
      this.meta = res.meta;
      this.loading=false;
      this.isLoading=false;
      this.breadSkeleton=false;
      console.log('RESPONSE',res);
      
    },error:(err)=>{
      console.log(err,'ERROR')
    }})
    
  }

  loadPrevious(){
    if (this.loading) return;
    if (this.minPageLoaded <= 1) return;
  
    const page = this.minPageLoaded - 1;
    this.loading = true;
  
  
    const previousHeight = document.documentElement.scrollHeight;
    const previousScroll = window.scrollY;

    
    this.service.adverts({
      slug: this.slug,
      ...this.currentFilters,
      page
    }).subscribe(res => {
      this.pages.unshift({
        page,
        items:res.data
      })
      this.minPageLoaded = page;
  
      this.loading = false;
  
      setTimeout(() => {
        const newHeight = document.documentElement.scrollHeight;
        const heightDiff = newHeight - previousHeight;
  
        window.scrollTo({
          top: previousScroll + heightDiff
        });
      });
    });
  }


  onFilterChange(params: FilterParams){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sort_by: params.sort_by ?? undefined,
          order: params.order ?? undefined,
          page:params.page ?? undefined,
          min_price:this.min_price ?? undefined,
          max_price:this.max_price ?? undefined
        }
      }); 
  }

  min_price?:number;
  max_price?:number;
  active_min?:number | null;
  active_max?:number |null;


  onPriceChange(event: { min?: number; max?: number }) {
    this.applyPrices(event.min, event.max);
  }
  applyPrices(min?: number, max?: number ) {
    /* if (
      this.min_price != null &&
      this.max_price != null &&
      this.min_price > this.max_price
    ) {
      [this.min_price, this.max_price] = [this.max_price, this.min_price];
    } */
    // currentFilters'i kopyala ve min/max ekle
    console.log(min,max,'BUNLAR GELENLER')
    const newFilters: FilterParams = {
      ...this.currentFilters,
      min_price: min ?? null,
      max_price: max ?? null,
    };
    this.min_price=min;
    this.max_price=max;
    this.mobileFilter=false;
    
    this.breadSkeleton=true;
    console.log(this.currentFilters,'BUTON')
    // URL'i güncelle
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'merge',
    });
  }
  removePrice(event:any){

    this.active_max=undefined;
    this.active_min=undefined;
    this.min_price=undefined;
    this.max_price=undefined;
    console.log(this.active_max,this.active_min)
    this.currentFilters.max_price=null;
    this.currentFilters.min_price=null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.currentFilters,
      queryParamsHandling: 'merge'
    });

    
  }

  private updateUrlPage(page: number | null){
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page ?? undefined },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }


  private isSameFilters(a: FilterParams, b: FilterParams): boolean {
    return (
      a.sort_by === b.sort_by &&
      a.order === b.order &&
      a.min_price === b.min_price &&
      a.max_price === b.max_price
    );
  }

  
    loadMore(){
      this.fetchAdverts(false);

    }

  
  
  
}

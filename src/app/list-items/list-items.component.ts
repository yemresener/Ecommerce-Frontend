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

@Component({
  selector: 'app-list-items',
  imports: [CommonModule,FormsModule,RouterModule,CardComponent,CategoryNodeComponent,CategoryFilterComponent],
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
    this.route.paramMap.subscribe(params=>{
      this.slug=params.get('slug')??'';
      this.resetState();
      this.getCategoryTree();
      this.fetchAdverts(true);
    })
    this.route.queryParams.subscribe(params => {

      const filters: FilterParams = {};
      const page = Number(params['page'] ?? 1);
    
      if (params['sort_by']) filters.sort_by = params['sort_by'];
      if (params['order']) filters.order = params['order'];
      filters.min_price = params['min_price'] ? Number(params['min_price']) : undefined;
      filters.max_price = params['max_price'] ? Number(params['max_price']) : undefined;
      console.log('SALAMLAR', filters)
      this.min_price = filters.min_price;
      this.max_price = filters.max_price;

      const filtersChanged =
        JSON.stringify(filters) !== JSON.stringify(this.currentFilters);
    
      if (filtersChanged) {
        // Gerçek reset
        this.currentFilters = filters;
        this.fetchAdverts(true, page);
        return;
      }
    
    });
    console.log(this.slug);
    console.log(this.currentFilters,'CURRENT FILTER')
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.pageObserver?.disconnect();
  }
  private resetState() {
    this.pages = [{
      page: 0,
      items: this.skeletonItems
    }];
  
    this.meta = undefined!;
    this.minPageLoaded = 1;
    this.maxPageLoaded = 1;
    this.isLoading = true;
    this.loading = false;
  
    window.scrollTo({ top: 0 });
  }


  category_tree!:Category;
  breadcrumb!:BreadCrumb[];
  activeCategory?:Category;
  adverts!: MiniAdvert[];
  meta!:PaginationMeta;

  getCategoryTree(){
    this.service.category(this.slug).subscribe({
      next:(res)=>{
        this.category_tree=res.filters.category_tree;
        this.breadcrumb=res.filters.breadcrumb;
        this.activeCategory=res.filters.active_category;
        console.log(this.activeCategory,'ACTİVE')
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  currentFilters!:FilterParams;

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

    this.service.adverts({
      slug:this.slug,
      ...this.currentFilters,
      page

    }).subscribe(res=>{
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
      console.log('RESPONSE',res);
    
    })
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
  applyPrices() {
    // currentFilters'i kopyala ve min/max ekle
    const newFilters: FilterParams = {
      ...this.currentFilters,
      min_price: this.min_price,
      max_price: this.max_price,
    };
  
    this.currentFilters = newFilters;
      console.log(this.currentFilters,'BUTON')
    // URL'i güncelle
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: newFilters,
      queryParamsHandling: 'merge',
    });
  
    // Verileri tekrar çek
    this.fetchAdverts(true, 1);
  }


  private updateUrlPage(page: number | null){
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page ?? undefined },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }



    loadMore(){
      this.fetchAdverts(false);

    }

  
  
  
}

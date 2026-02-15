import { Component, ViewChild,ElementRef } from '@angular/core';
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
@Component({
  selector: 'app-list-items',
  imports: [CommonModule,CardComponent,CategoryNodeComponent,CategoryFilterComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  @ViewChild('scrollAnchor') anchor!: ElementRef;

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

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(enter=>{
      if(enter[0].isIntersecting){
        this.loadMore();
        
      }
    },{threshold:0.2})
    this.observer.observe(this.anchor.nativeElement);
    

  }




  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.slug=params.get('slug')??'';
      this.getCategoryTree();
    })
    this.route.queryParams.subscribe(params => {
      const filters: FilterParams = {};
      const initialPage = params['page'] || 1;

      if (params['sort_by']) filters.sort_by = params['sort_by'];
      if (params['order']) filters.order = params['order'];
      this.currentFilters = filters;
      this.fetchAdverts(true, initialPage);

    });
    console.log(this.slug);
  }



  category_tree!:Category;
  breadcrumb!:BreadCrumb[];
  activeCategory!:Category;
  adverts!: MiniAdvert[];
  meta!:PaginationMeta;

  getCategoryTree(){
    this.service.category(this.slug).subscribe({
      next:(res)=>{
        this.category_tree=res.filters.category_tree;
        this.breadcrumb=res.filters.breadcrumb;
        this.activeCategory=res.filters.active_category;
        console.log(res);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  currentFilters!:FilterParams;

  skeletonItems = Array(8).fill(null);

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

    if (!reset && page !== this.meta?.current_page) {
      this.updateUrlPage(page);
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
    })
  }

  loadPrevious(){
    if (this.loading) return;
    if (this.minPageLoaded <= 1) return;
  
    const page = this.minPageLoaded - 1;
    this.loading = true;
  
  
    this.service.adverts({
      slug: this.slug,
      ...this.currentFilters,
      page
    }).subscribe(res => {
  
      this.adverts = [...res.data, ...this.adverts];
      this.minPageLoaded = page;
  
      this.loading = false;
  
      
    });
  }


  onFilterChange(params: FilterParams){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sort_by: params.sort_by ?? undefined,
          order: params.order ?? undefined,
          page:params.page ?? undefined,
        }
      });
      
  }

  private updateUrlPage(page:number){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }



    loadMore(){
      this.fetchAdverts(false);

    }

  
  
  
}

import { Component } from '@angular/core';
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

  constructor(private router:Router,
    private route:ActivatedRoute,private service:ListService){}

  categoryOpen = true;
  priceOpen=true;
  brandOpen= true;
  sortOption=false;

  slug!:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.slug=params.get('slug')??'';
      this.getCategoryTree();
    })
    this.route.queryParams.subscribe(params => {
      const filters: FilterParams = {};

      if (params['sort_by']) filters.sort_by = params['sort_by'];
      if (params['order']) filters.order = params['order'];

      this.currentFilters = filters;
      this.fetchAdverts(true); 
    });
    console.log(this.slug);
  }



  category_tree!:Category;
  breadcrumb!:BreadCrumb[];
  adverts!: MiniAdvert[];
  meta!:PaginationMeta;

  getCategoryTree(){
    this.service.category(this.slug).subscribe({
      next:(res)=>{
        this.category_tree=res.filters.category_tree;
        this.breadcrumb=res.filters.breadcrumb;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  /*
  getPage(){
    this.service.adverts(this.slug).subscribe({
      next:(res)=>{
        console.log(res)
        this.adverts=res.data;
        this.category_tree=res.filters.category_tree;
        this.breadcrumb=res.filters.breadcrumb;
        this.meta =res.meta;
        console.log(this.category_tree,'tree')
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }  
    */
  currentFilters!:FilterParams;


  loading=false;
  fetchAdverts(reset=false){
    console.log('çalışıyoz fetch');

    if(this.loading) return;
    if(!reset && this.meta.current_page >= this.meta.last_page) return;
    this.loading=true;

    const page = reset ? 1:(this.meta?.current_page ?? 0) +1;
    this.service.adverts({
      slug:this.slug,
      page,
      ...this.currentFilters
    }).subscribe(res=>{
      this.adverts = reset ? res.data : [...this.adverts,...res.data];
      this.meta = res.meta;
      this.loading=false;

      
    })
  }


    onFilterChange(params: FilterParams){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          sort_by: params.sort_by ?? undefined,
          order: params.order ?? undefined
        }
      });
      
    }


  loadMore(){
    this.loading=true;
    this.fetchAdverts(false);
  }

  
  
  
}

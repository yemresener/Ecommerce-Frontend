import { Component, ViewChild,ElementRef,ViewChildren,QueryList,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSliderComponent } from '../components/sections/product-slider/product-slider.component';
import { CardComponent } from '../shared/components/product/card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../Services/list.service';
import { Category } from '../interfaces/category';
import { BreadCrumb } from '../interfaces/bread-crumb';
import { CategoryNodeComponent } from '../shared/category-node/category-node.component';
import { CategoryFilterComponent } from '../shared/category-filter/category-filter.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../shared/filter/filter.component';
import { BaseAdvertListDirective } from '../shared/containers/base-advert-list.directive';

import { ListItemsComponent } from '../list-items/list-items.component';
import { NavbarCategoryService } from '../Services/navbar-category.service';
import { SeoService } from '../core/services/seo.service';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule,FormsModule,RouterModule,CardComponent,FilterComponent,CategoryNodeComponent,CategoryFilterComponent,ListItemsComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent extends BaseAdvertListDirective {

  navbarService = inject(NavbarCategoryService);

  categories = this.navbarService.getNavbarCategories();

  
  constructor(
    router: Router,
    route: ActivatedRoute,
    private service: ListService,
    private seoService:SeoService
  ) {
    super(router, route);
  }


  category_tree!: Category;
  breadcrumb!: BreadCrumb[];
  activeCategory!: Category;
  breadSkeleton = false;

  categoryOpen = true;
  priceOpen = true;
  brandOpen = true;
  sortOption = false;
  mobileFilter = false;


  protected fetchData(page: number): void {
    this.min_price = this.currentFilters.min_price;
    this.max_price = this.currentFilters.max_price;

    if(this.mode  === 'search'){
      if(!this.query) return;

      this.service.search({
        q:this.query,
        ...this.currentFilters,
        page
      }).subscribe(res=>{
        console.log(res,'GELEN RESPONSE')
        this.handleSuccess(res,page);
        this.isLoading=false;
        this.breadSkeleton = false;

        if(this.query && page===1){
          console.log(this.query,'QUEY')
          this.seoService.setSearchPage(this.query,res.meta.total)
          console.log('ÇALIŞTI KN')
        }
        
      }, err=> console.log(err))
    }else{

    
      if (!this.slug) {
        console.warn('Slug boş, API çağrısı yapılmayacak');
        return;
      }
      this.mobileFilter = false;
      console.log(page,'page')
      this.service.adverts({
        slug: this.slug,
        ...this.currentFilters,
        page
      }).subscribe(res => {
        console.log(res)
        this.handleSuccess(res, page);
        this.breadSkeleton = false;
        this.isLoading=false;
        if (this.mode === 'category' && page === 1) {
          console.log(res);
          this.seoService.setCategoryPage(res.category,res.data);
        }

      }, err => {
        this.loading = false;
        console.error(err);
      });
      
    }
  }
  

  protected onSlugChange(): void {
    console.log('ONSLUG CHANGED BROTHER')

    if (this.mode === 'category') {
      this.breadSkeleton = true;
      this.getCategoryTree();
    }else{
      
    }
  }

  private getCategoryTree(): void {

    this.service.category(this.slug).subscribe(res => {

      this.category_tree = res.filters.category_tree;
      this.breadcrumb = res.filters.breadcrumb;
      this.activeCategory = res.filters.active_category;

    }, err => {
      console.error(err);
    });
  }


  min_price?: number;
  max_price?: number;
  active_min?: number | null;
  active_max?: number | null;

  onPriceChange(event: { min?: number; max?: number }) {
    this.applyPrices(event.min, event.max);
  }

  applyPrices(min?: number, max?: number) {

    this.min_price = min;
    this.max_price = max;
    this.mobileFilter = false;
    this.breadSkeleton = true;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        min_price: min ?? undefined,
        max_price: max ?? undefined,
      },
      queryParamsHandling: 'merge'
    });
  }

  removePrice() {

    this.min_price = undefined;
    this.max_price = undefined;
    this.active_min = undefined;
    this.active_max = undefined;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        min_price: undefined,
        max_price: undefined,
      },
      queryParamsHandling: 'merge'
    });
  }



  
  
}

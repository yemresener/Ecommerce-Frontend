import { Component, ViewChild,ElementRef,ViewChildren,QueryList,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSliderComponent } from '../../shared/components/sliders/product-slider/product-slider.component';
import { CardComponent } from '../../shared/components/product/card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../features/list-item/list.service';
import { Category } from '../../features/category/interfaces/category';
import { BreadCrumb } from '../../features/category/interfaces/bread-crumb';
import { CategoryNodeComponent } from '../../features/category/category-node/category-node.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from '../../shared/filter/filter.component';
import { BaseAdvertListDirective } from '../../shared/containers/base-advert-list.directive';

import { SeoService } from '../../core/seo-service/seo.service';
import { CategoryFilterComponent } from '../../features/category/category-filter/category-filter.component';
import { NavbarCategoryService } from '../../shared/layouts/navbar/navbar-category.service';

@Component({
  selector: 'app-category-page',
  imports: [CommonModule,FormsModule,RouterModule,CardComponent,FilterComponent,CategoryNodeComponent,CategoryFilterComponent],
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

  override ngOnInit() {
    // 1. Resolver'ın API'den çekip kapıda hazır ettiği veriyi alıyoruz
    const data = this.route.snapshot.data['resolvedData'];
    
    console.log('Resolverdan gelen tertemiz veri:', data);

    super.ngOnInit(); 
  }

  override handleSuccess(res: any, page: number) {
    // 1. Önce Base sınıf (Baba) kendi işini yapsın (adverts listesini doldurma, pagination vs.)
    super.handleSuccess(res, page);
  
    // 2. Sonra bizim (Çocuk) component'e özel UI ve SEO işlemleri çalışsın
    this.isLoading = false;
    this.breadSkeleton = false;
    this.min_price = this.currentFilters.min_price;
    this.max_price = this.currentFilters.max_price;
  
    if (this.mode === 'search' && this.query && page === 1) {
      this.seoService.setSearchPage(this.query, res.meta.total);
    } else if (this.mode === 'category' && page === 1) {
      this.seoService.setCategoryPage(res.category, res.data);
    }
  }
  
  // fetchData artık sadece "Getirici" (Kurye) görevi görüyor.
  protected fetchData(page: number): void {
  
  
    if (this.mode === 'search') {
      if (!this.query) return;
      this.service.search({
        q: this.query, ...this.currentFilters, page
      }).subscribe({
        next: (res) => this.handleSuccess(res, page),
        error: (err) => {
           this.loading = false;
           console.log(err);
        }
      });
    } else {
      if (!this.slug) return;
      this.mobileFilter = false;
      this.service.adverts({
        slug: this.slug, ...this.currentFilters, page
      }).subscribe({
        next: (res) => this.handleSuccess(res, page),
        error: (err) => {
          this.loading = false;
          console.error(err);
        }
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

    this.service.category(this.slug).subscribe({
      next:(res)=>{
        this.category_tree = res.filters.category_tree;
        this.breadcrumb = res.filters.breadcrumb;
        this.activeCategory = res.filters.active_category;
        console.log(this.breadcrumb,'ACTIVE ONE ');
        this.breadSkeleton = false;
      },
      error:(err)=>{
        console.log(err);
      }
   
   
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

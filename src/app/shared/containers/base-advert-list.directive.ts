  import { Directive, ViewChild, ViewChildren, ElementRef, QueryList, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { combineLatest } from 'rxjs';
  import { debounceTime, filter } from 'rxjs/operators';
  import { PaginationMeta } from '../../interfaces/pagination-meta';
  import { MiniAdvert } from '../../interfaces/mini-advert';
  import { FilterParams } from '../../interfaces/filter-params';

  import { isPlatformBrowser } from '@angular/common';
  import { PLATFORM_ID, inject } from '@angular/core';

  @Directive()

  export abstract class BaseAdvertListDirective 
    implements OnInit, AfterViewInit, OnDestroy{

      @ViewChild('scrollAnchor') anchor!: ElementRef;
      @ViewChildren('pageBlock') pageBlocks!: QueryList<ElementRef>;

      private platformId = inject(PLATFORM_ID);
      private isBrowser() { return isPlatformBrowser(this.platformId); }

      protected abstract fetchData(page: number): void;
      protected abstract onSlugChange(): void;

      constructor(
        protected router: Router,
        protected route: ActivatedRoute
      ) {}
    
      slug!: string;
      meta!: PaginationMeta;
      oldMeta!: PaginationMeta;
    
      pages: { page: number; items: MiniAdvert[] }[] = [];
      adverts: MiniAdvert[] = [];  
      currentFilters: FilterParams = {};
      skeletonItems = Array(12).fill(null);
    
      minPageLoaded = 1;
      maxPageLoaded = 1;
      loading = false;
      isLoading = true;
      activePage!: number;
    
      private observer!: IntersectionObserver;

      // INIT

      mode: 'category' | 'search' = 'category';
      query?: string;

      ngOnInit(): void {
        this.pages = [{ page: 0, items: this.skeletonItems }];

        this.mode = this.route.snapshot.data['mode'] ?? 'category';

        if (this.isBrowser()) {
          history.scrollRestoration = 'manual'; //  ssr 
        }combineLatest([
          this.route.paramMap,
          this.route.queryParams
        ])
        .pipe(debounceTime(0))
        .subscribe(([params, query]) => {
    
          const slug = this.mode === 'category' 
          ? (params.get('slug') ?? '') 
          : '__search__';

          const searchQuery = this.mode === 'search' 
          ? (query['q'] ?? '') 
          : undefined;

          const page = Number(query['page'] ?? 1);

          console.log('PAGE GELDİ KNK',page)
          const filters: FilterParams = {};

          if (query['sort_by'])   filters.sort_by   = query['sort_by'];
          if (query['order'])     filters.order     = query['order'];
          if (query['min_price']) filters.min_price = Number(query['min_price']);
          if (query['max_price']) filters.max_price = Number(query['max_price']);
    
          const slugChanged = this.slug !== slug;
          const queryChanged = this.query !== searchQuery; 

          const filtersChanged =
            JSON.stringify(filters) !== JSON.stringify(this.currentFilters);
    
          if (slugChanged || filtersChanged || queryChanged) {

            this.slug = slug;
            this.query = searchQuery; 
            this.currentFilters = filters;
            this.resetState();
    
            if (slugChanged || queryChanged) {
              this.onSlugChange(); // 🔥 override edilecek
            }
    
            this.triggerFetch(true, page);
          }
        });
      }


    ngAfterViewInit(): void {
      if (!this.isBrowser()) return; // ssr

      this.initInfiniteScroll();
      window.addEventListener('scroll', this.updateActivePageByScroll, { passive: true });


    }

    ngOnDestroy(): void {
      this.observer?.disconnect();
      if (this.isBrowser()) { // ssr
        window.removeEventListener('scroll', this.updateActivePageByScroll);
      }
    }

    // FETCH
    private pendingFetch = false;

    protected triggerFetch(reset: boolean, forcedPage?: number) {
      console.log('DENİYOR');
      if (this.loading || this.pendingFetch) return;
      console.log('DENİYOR');

      if (!reset && (!this.meta || this.meta.current_page >= this.meta.last_page)) return;
      console.log('DENİYOR');
      
      this.pendingFetch = true; 
      this.loading = true;

      const page = forcedPage ?? (reset ? 1 : (this.meta?.current_page ?? 0) + 1);

      this.maxPageLoaded = page;
      if (forcedPage && forcedPage > 1) {
        this.minPageLoaded = forcedPage; // ← sadece deep link'te set et
      }
      console.log(this.maxPageLoaded,'MAX PAGE BU ')

      console.log(this.minPageLoaded,'MİN PAGE TRIGGER')
      this.fetchData(page); // 🔥 child component handle edecek
    }

    protected handleSuccess(res: any, page: number) {

      this.pendingFetch = false; 
      const isPrev = this.isPreviousLoad;
      this.isPreviousLoad = false;


        if (isPrev) {
        // başa ekle
        this.pages = [{ page, items: res.data }, ...this.pages.filter(p => p.page !== 0)];
        this.adverts = [...res.data, ...this.adverts];
        this.minPageLoaded = page;
        console.log(this.minPageLoaded,'MİN PAGE ISPREV')
        console.log(this.maxPageLoaded,'MAX PAGE HANDLE2')


      } else if (page === 1) {
        this.pages = [{ page, items: res.data }];
        this.adverts = res.data;
        this.minPageLoaded = 1;
        console.log(this.minPageLoaded,'MİN PAGE page 1')
        console.log(this.maxPageLoaded,'MAX PAGE HANDLE1')
        this.meta = res.meta;

      } else {
        this.pages = this.pages.filter(p => p.page !== 0);
        this.pages.push({ page, items: res.data });
        this.adverts = [...this.adverts, ...res.data];
        this.meta = res.meta;


      }


      console.log('SALAMLAR');
      console.log('ADVERTS',this.adverts)
      console.log(this.maxPageLoaded,'MAX PAGE handle')

      this.loading = false;
      this.isLoading = false;
      console.log(this.meta,'META')

      if (isPrev) {
        setTimeout(() => {
          if (!this.isBrowser()) return; // ✅ ekle
          const newHeight = document.documentElement.scrollHeight;
          window.scrollTo({ top: this.previousScroll + (newHeight - this.previousHeight) });
        });
      }
    }

    // STATE

    private resetState() {
      
      this.pages = [{ page: 0, items: this.skeletonItems }];
      this.adverts = [];
      this.oldMeta = this.meta;
      this.meta = undefined!;
      this.minPageLoaded = 1;
      console.log(this.minPageLoaded,'MIN PAGE RESET STATE')
      this.maxPageLoaded = 1;
      this.loading = false;
      this.isLoading = true;

      if (this.isBrowser()) {
        window.scrollTo({ top: 0 }); // ssr
      }
    }

    // SCROLL



    private initInfiniteScroll() {
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (!this.meta) return; 
          console.log(this.maxPageLoaded,'SALAMLAR ÇALIŞIYORUM KNK')
          console.log(this.meta.current_page,'CURRENT PAGE META')
          if (this.meta.current_page < this.maxPageLoaded) return;
          console.log('SALAMLAR çal KNK')

          this.triggerFetch(false);
        }
      }, { threshold: 0.2 });

      this.observer.observe(this.anchor.nativeElement);
    }


    private updateActivePageByScroll = () => {
      if (!this.isBrowser()) return; // ssr
      const viewportMid = window.innerHeight / 2; //ssr

      const blocks = this.pageBlocks.toArray();
      if (!blocks.length) return;
    
    
      let activePage = 1;
      for (const block of blocks) {
        const rect = block.nativeElement.getBoundingClientRect();
        if (rect.top <= viewportMid) {
          activePage = Number(block.nativeElement.getAttribute('data-page'));
        }
      }
    
      if (this.activePage === activePage) return;
      this.activePage = activePage;
      this.updateUrlPage(activePage === 1 ? null : activePage);
    }

    private updateUrlPage(page: number | null) {
      console.log(page,'PAGE KBK')
      console.log(this.minPageLoaded,'MİN PAGE updateURL')
      console.log(this.maxPageLoaded,'MAX PAGE updateURL')

      page = page ? page : null;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: page ?? undefined },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }

    loadMore() {
      this.triggerFetch(false);
    }
    private isPreviousLoad = false;
    previousHeight:any;
    previousScroll:any;
    loadPrevious() {
      
      if (!this.isBrowser()) return
      if (this.loading || this.minPageLoaded <= 1) return;

      this.previousHeight = document.documentElement.scrollHeight;
      this.previousScroll = window.scrollY;

      const page = this.minPageLoaded - 1;
      this.loading = true;
      this.isPreviousLoad = true;

      console.log(page,'PAGE PREVIOUS')
      this.fetchData(page); // child handle edecek
    }

    onFilterChange(params: FilterParams) {
  
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          q:this.query,
          ...params,
          page: undefined
        },
      });
    }



  }

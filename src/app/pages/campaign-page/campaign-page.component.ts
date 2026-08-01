import { Component,TransferState,makeStateKey,Optional,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RESPONSE_TOKEN } from '../../core/tokens/response.token';

import { ActivatedRoute } from '@angular/router';
import { BaseAdvertListDirective } from '../../shared/containers/base-advert-list.directive';
import { Router } from '@angular/router';
import { CardComponent } from '../../shared/components/product/card/card.component';
import { Campaign } from '../../features/campaign/campaign';
import { FilterParams } from '../../shared/filter/filter-params';
import { SeoService } from '../../core/seo-service/seo.service';
import { CampaignServiceService } from '../../features/campaign/campaign-service.service';
import { CategoryFilterComponent } from '../../features/category/category-filter/category-filter.component';
import { LayoutService } from '../../Services/layout.service';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
@Component({
  selector: 'app-campaign-page',
  imports: [CommonModule,CardComponent,CategoryFilterComponent,NotFoundComponent],
  templateUrl: './campaign-page.component.html',
  styleUrl: './campaign-page.component.css'
})
export class CampaignPageComponent extends BaseAdvertListDirective {

  constructor(
    router: Router,
    route: ActivatedRoute,
    private service: CampaignServiceService,
    private seoService:SeoService,
    private transferState: TransferState,
    private layoutService:LayoutService,  
    @Optional() @Inject(RESPONSE_TOKEN) private response: any
  ) {
    super(router, route);
  }

  
  notFound?:boolean;

  protected fetchData(page:number):void{
    if(!this.slug) return;
    console.log('layout',this.layoutService.showLayout());

    const ERROR_KEY = makeStateKey<boolean>('404_error_' + this.slug);
    console.log('ERROR SLUG',ERROR_KEY);

    if (this.transferState.hasKey(ERROR_KEY)) {
      this.notFound = true;
        console.log('ERROR SLUG',ERROR_KEY);
        this.layoutService.showLayout.set(false);
        console.log('layout',this.layoutService.showLayout());

      return; // Fonksiyonu burada kes, 2. isteği engelle
    }

    
    const params: FilterParams = {
      ...this.currentFilters,
      page: page
    };
    this.service.getAdverts(params,this.slug).subscribe({
      next:(res)=>{
        console.log(res,'GELEN BU');
        this.handleSuccess(res, page);
        this.campaign=res.campaign;
        
        console.log(this.campaign,res.data,'GÖNDERİLENLER')
        this.seoService.setCampaignPage(this.campaign,res.data)
      },
      error:(err)=>{
     
        console.log('SALAMLAR');
        console.log(err)
  
        this.notFound = true;
        console.log('showLayout önce:', this.layoutService.showLayout());
  
      this.layoutService.showLayout.set(false);
        console.log('showLayout sonra:', this.layoutService.showLayout());
  
      this.seoService.setNotFound();
      if (!this.isBrowser()) {
        this.transferState.set(ERROR_KEY, true);
        this.response.status(404);
  
      }
      
      }
    }
      


      
    )
  }
  protected override onSlugChange(): void {

  }
  campaign!:Campaign;

  /*
  private getCampaignDetails(){
    if(!this.slug) return;
    this.service.getCampaignDetails(this.slug).subscribe(res=>{
      console.log(res,'CAMPAING BU ')
      this.campaign=res.data;
      this.seoService.setCampaignPage(this.campaign,this.adverts);
    },err=>{
      console.log(err)
    })
  }

  */
}

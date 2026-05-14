import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignServiceService } from '../Services/campaign-service.service';
import { ActivatedRoute } from '@angular/router';
import { BaseAdvertListDirective } from '../shared/containers/base-advert-list.directive';
import { Router } from '@angular/router';
import { CardComponent } from '../shared/components/product/card/card.component';
import { Campaign } from '../interfaces/campaign';
import { CategoryFilterComponent } from '../shared/category-filter/category-filter.component';
import { FilterParams } from '../interfaces/filter-params';
import { SeoService } from '../core/services/seo.service';
@Component({
  selector: 'app-campaign-page',
  imports: [CommonModule,CardComponent,CategoryFilterComponent],
  templateUrl: './campaign-page.component.html',
  styleUrl: './campaign-page.component.css'
})
export class CampaignPageComponent extends BaseAdvertListDirective {

  constructor(
    router: Router,
    route: ActivatedRoute,
    private service: CampaignServiceService,
    private seoService:SeoService
  ) {
    super(router, route);
  }

  

  protected fetchData(page:number):void{
    if(!this.slug) return;
    const params: FilterParams = {
      ...this.currentFilters,
      page: page
    };
    this.service.getAdverts(params,this.slug).subscribe(res=>{
      console.log(res,'GELEN BU');
      this.handleSuccess(res, page);
      this.campaign=res.campaign;
      
      console.log(this.campaign,res.data,'GÖNDERİLENLER')
      this.seoService.setCampaignPage(this.campaign,res.data)

    }, err=>{
      console.log(err)
    })
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

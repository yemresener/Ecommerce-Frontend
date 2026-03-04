import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignServiceService } from '../Services/campaign-service.service';
import { ActivatedRoute } from '@angular/router';
import { BaseAdvertListDirective } from '../shared/containers/base-advert-list.directive';
import { Router } from '@angular/router';
import { CardComponent } from '../shared/components/product/card/card.component';
import { Campaign } from '../interfaces/campaign';
import { CategoryFilterComponent } from '../shared/category-filter/category-filter.component';
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
    private service: CampaignServiceService
  ) {
    super(router, route);
  }


  protected fetchData(page:number):void{
    if(!this.slug) return;
    this.service.getAdverts(this.slug).subscribe(res=>{
      console.log(res)
      this.handleSuccess(res, page);

    }, err=>{
      console.log(err)
    })
  }
  protected override onSlugChange(): void {
    this.getCampaignDetails();
  }
  campaign!:Campaign;

  private getCampaignDetails(){
    if(!this.slug) return;
    this.service.getCampaignDetails(this.slug).subscribe(res=>{
      console.log(res)
      this.campaign=res.data;
    },err=>{
      console.log(err)
    })
  }

}

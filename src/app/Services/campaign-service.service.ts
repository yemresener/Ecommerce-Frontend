import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { MiniAdvert } from '../interfaces/mini-advert';
import { Campaign } from '../interfaces/campaign';
import { FilterParams } from '../interfaces/filter-params';
@Injectable({
  providedIn: 'root'
})
export class CampaignServiceService {

  constructor(private http:HttpClient) { }

  getAdverts(params:FilterParams,slug:string){
    const url = `http://127.0.0.1:8000/api/getCampaignAdverts/${slug}`;
    return this.http.get<ApiResponse<{advert:MiniAdvert,campaign:Campaign}>>(url,{
      params:params as any,
      withCredentials:true
    }
  );
  }

  getCampaignDetails(slug:string){
    const url = `http://127.0.0.1:8000/api/getCampaignDetails/${slug}`;
    return this.http.get<ApiResponse<Campaign>>(url);
  }


}

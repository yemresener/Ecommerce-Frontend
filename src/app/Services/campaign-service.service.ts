import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { MiniAdvert } from '../interfaces/mini-advert';
import { Campaign } from '../interfaces/campaign';
@Injectable({
  providedIn: 'root'
})
export class CampaignServiceService {

  constructor(private http:HttpClient) { }

  getAdverts(slug:string){
    const url = `http://127.0.0.1:8000/api/getCampaignAdverts/${slug}`;
    return this.http.get<ApiResponse<{advert:MiniAdvert,campaign:Campaign}>>(url);
  }

  getCampaignDetails(slug:string){
    const url = `http://127.0.0.1:8000/api/getCampaignDetails/${slug}`;
    return this.http.get<ApiResponse<Campaign>>(url);
  }


}

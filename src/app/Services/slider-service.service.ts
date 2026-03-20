import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { SliderModel } from '../shared/components/slider/slider.model';
import { HomeSection } from '../models/home-section';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderServiceService {

  constructor(public http:HttpClient) { }
  en=0;

  public getSlider(id:number){

    const url= `${environment.apiUrl}getSliderItem/${id}`;
    return this.http.get<{ data: any }>(url);
  }


  public getLayout(sliderPage:string){
    const url = `${environment.apiUrl}getLayout/${sliderPage}`;
    return this.http.get<{ data: any }>(url);
  }


}

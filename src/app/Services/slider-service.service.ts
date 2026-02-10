import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interfaces/api-response';
import { SliderModel } from '../shared/components/slider/slider.model';
@Injectable({
  providedIn: 'root'
})
export class SliderServiceService {

  constructor(public http:HttpClient) { }
  en=0;

  public getSlider(sliderPage:string){

    const url= `http://127.0.0.1:8000/api/getSliderItem/${sliderPage}`;
    return this.http.get<ApiResponse<SliderModel>>(url);
  }



}

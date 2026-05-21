import { ApiSliderItem } from "./api-slider-item";
export interface ApiSliderSection {
    id: number;
    type: 'banner' | 'hero' | 'advert' | 'banner_campaign' | 'main_slider';
    title: string;
    items: ApiSliderItem[];
}



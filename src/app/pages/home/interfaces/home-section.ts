export interface HomeSection {
    id: number;
    type: 'banner' | 'hero' | 'advert' | 'banner_campaign' | 'main_slider';
    title: string;
    ref_type: 'category' | 'product';
    items: any[];
    
  }
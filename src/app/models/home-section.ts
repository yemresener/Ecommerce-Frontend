export interface HomeSection {
    id: number;
    sectionType: 'banner' | 'hero' | 'advert' | 'banner_campaign' | 'main_slider';
    title: string;
    itemType: 'category' | 'product';
    items: any[];
  }
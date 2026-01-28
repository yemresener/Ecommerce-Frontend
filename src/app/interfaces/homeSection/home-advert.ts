import { Product } from "../product";
export interface HomeAdvert {
    type: 'advert';
    id: number;
    title: string;
    price: number;
    avg: number;
    commentCount: number;
    img: string;
    item_ref: Product;
  }
import { Product } from "./product"

export interface Advert {
    id:number,
    product_id:number,
    category_id:number,
    title:string,
    slug:string,
    description:string,
    avg_rating:number | null,
    total_comments:number | null,
    images:string | null,
    image:string | null,
    discount_price:number,
    original_price:number,
    views:number,
    item_ref:Product;
}

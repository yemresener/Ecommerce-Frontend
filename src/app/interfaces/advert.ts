import { Feature } from "./feature";
import { Product } from "./product"
import { ProductImage } from "./product-image";

export interface Advert {
    id:number,
    category_id:number,
    title:string,
    slug:string,
    description:string,
    avg_rating:number | null,
    total_comments:number | null,
    
    original_price:number,
    discount_price:number,
    discount_type:string | null,
    discount_value:number | null,

    features:Feature[] | null,

    images:ProductImage[] | null,
}

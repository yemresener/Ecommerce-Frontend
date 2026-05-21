import { ProductImage } from "../../product/interfaces/product-image";

export interface MiniAdvert {
    id:number,
    category_id:number,
    title:string,
    slug:string,
    avg_rating:number | null,
    total_comments:number | null,
    image?:ProductImage |null,
    images:ProductImage[] | null,
    original_price:number,
    discount_price:number | null,
    discount_type:string | null,
    discount_value:number | null,
    active_stock?:boolean

}

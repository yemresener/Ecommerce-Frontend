import { MiniProduct } from "./mini-product"

export interface MiniAdvert {
    id:number,
    category_id:number,
    title:string,
    slug:string,
    avg_rating:number | null,
    total_comments:number | null,
    image:string | null,
    original_price:number,
    discount_price:number
}

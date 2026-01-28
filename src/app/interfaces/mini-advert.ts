import { MiniProduct } from "./mini-product"

export interface MiniAdvert {
    id:number,
    category_id:number,
    title:string,
    slug:string,
    avg_rating:number | null,
    total_comments:number | null,
    item_ref:MiniProduct
}

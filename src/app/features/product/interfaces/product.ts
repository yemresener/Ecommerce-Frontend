import { ProductImage } from "./product-image"
import { Feature } from "./feature"
export interface Product {
    id:number,
    name:string,
    category_id:number,
    brand_id:number,
    price:number,
    discount_price:number | null,
    is_discount_active:boolean,
    image:string,
    weight:number,
    stock:number,
    slug:string,
    images:ProductImage[],
    features:Feature[]
}

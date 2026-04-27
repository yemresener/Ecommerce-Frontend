import { ReviewUser } from "./review-user";

export interface Review {
    id:number,
    advert_id:number,
    rating:number,
    status:string,
    comment:string | null,
    comment_date:string,
    image:string,
    advert_slug:string,
    product_name:string,
    user:ReviewUser
}

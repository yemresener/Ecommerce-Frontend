import { ReviewUser } from "./review-user";

export interface Review {
    advert_id:number,
    rating:number,
    status:string,
    comment:string | null,
    comment_date:string,
    user:ReviewUser
}

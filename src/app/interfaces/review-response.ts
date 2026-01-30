import { MiniAdvert } from "./mini-advert";
import { Review } from "./review";

export interface ReviewResponse {
    advert:MiniAdvert,
    reviews:Review[]
}

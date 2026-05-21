import { MiniAdvert } from "../../advert/interfaces/mini-advert";
import { Review } from "./review";
import { ReviewStats } from "./review-stats";
export interface ReviewResponse {
    advert:MiniAdvert,
    reviews:Review[],
    stats:ReviewStats
}

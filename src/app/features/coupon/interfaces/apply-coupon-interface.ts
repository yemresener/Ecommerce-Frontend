    import { CartApiResponse } from "../../cart/interfaces/cart-api-response";
import { Coupon } from "./coupon";
export interface ApplyCouponInterface extends CartApiResponse{

    coupon:Coupon;


}

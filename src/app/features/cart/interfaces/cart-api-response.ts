import { ApiResponse } from "../../../interfaces/api-response";
import { Cart } from "./cart";
import { CartSummary } from "./cart-summary";
export interface CartApiResponse extends ApiResponse<Cart[]>{
    summary:CartSummary
}

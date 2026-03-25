import { CartApiResponse } from "./cart-api-response";
import { AddressInterface } from "./address-interface";
export interface Checkout extends CartApiResponse{
    address:AddressInterface

}

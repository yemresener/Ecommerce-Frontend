import { CartApiResponse } from "../cart/interfaces/cart-api-response";
import { AddressInterface } from "../address/address-interface";
import { CreditCardInterface } from "../payment/interfaces/credit-card-interface";
import { Installment } from "../payment/interfaces/installment";
export interface Checkout extends CartApiResponse{
    address:AddressInterface,
    savedCards:CreditCardInterface[],
    default_card:CreditCardInterface,
    installments:Installment[]
}

import { CartApiResponse } from "./cart-api-response";
import { AddressInterface } from "./address-interface";
import { CreditCardInterface } from "./payment/creditCard/credit-card-interface";
import { Installment } from "./payment/installment";
export interface Checkout extends CartApiResponse{
    address:AddressInterface,
    savedCards:CreditCardInterface[],
    installments:Installment[]
}

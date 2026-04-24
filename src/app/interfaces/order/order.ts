import { AddressInterface } from "../address-interface";
import { OrderCargoDetailInterface } from "../cargo/order-cargo-detail-interface";
import { RefundRequestInterface } from "../refundInterfaces/refund-request-interface";
import { OrderItems } from "./order-items";

export interface Order {
    id:number,
    ordered_at:string,
    subTotal:number,
    total:number,
    installment_fee:number,
    installment:number,
    discount_total:number,
    cargo_fee:number,
    payment_status:string,
    last_four:string,
    card_bank:string,
    status:string,
    order_items_count:number,
    order_items:OrderItems[],
    shipping_address:AddressInterface,
    refund_request_count:number,
    fully_refunded:boolean,
    refund_request:RefundRequestInterface[],
    cargo_details:OrderCargoDetailInterface[],
    refund_sum_amount:string

}

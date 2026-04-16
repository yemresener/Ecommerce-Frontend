import { OrderItems } from "./order-items";

export interface Order {
    ordered_at:string,
    users_address_id:number,
    subTotal:number,
    total:number,
    installment_fee:number,
    installment:number,
    cargo_fee:number,
    payment_status:string,
    status:number,
    order_items:OrderItems[]
}

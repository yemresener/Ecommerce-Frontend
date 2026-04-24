import { RefundRequestItemsInterface } from "./refund-request-items-interface";

export interface RefundRequestInterface {
    order_id:number,
    status:string,
    reason:string,
    cargo_tracking_code:number,
    cargo_company:string,
    shipped_at:string,
    received_at:string,
    admin_note:string,
    items:RefundRequestItemsInterface[]
    
}

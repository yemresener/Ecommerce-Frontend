export interface RefundRequestItemsInterface {
    id:number,
    refund_request_id:number,
    order_item_id:number,
    quantity:number,
    amount:number,
    image:string,
    approved_quantity:number,
    rejected_quantity:number
    
}

import { CargoItemsInterface } from "./cargo-items-interface";

export interface OrderCargoDetailInterface {
    order_id:number,
    cargo_company:string,
    tracking_code:string,
    tracking_url:string,
    status:string,
    shipped_at:string,
    delivered_at:string,
    notes:string,
    items:CargoItemsInterface[]
}

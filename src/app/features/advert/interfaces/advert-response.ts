import { Advert } from "./advert";
import { BreadCrumb } from "../../category/interfaces/bread-crumb";

export interface AdvertResponse {
    advert:Advert,
    bread_crumb:BreadCrumb[],
    active_stock:boolean
}

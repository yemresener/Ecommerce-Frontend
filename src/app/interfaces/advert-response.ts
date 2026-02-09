import { Advert } from "./advert";
import { BreadCrumb } from "./bread-crumb";

export interface AdvertResponse {
    advert:Advert,
    bread_crumb:BreadCrumb[]
}

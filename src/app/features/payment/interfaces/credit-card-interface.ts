export interface CreditCardInterface {
    id:number,
    user_id:number,
    card_alias:string,
    last_four:string,
    is_default:boolean,
    bin_number:string,
    card_bank:string,
    card_family:string
    card_type:string
}

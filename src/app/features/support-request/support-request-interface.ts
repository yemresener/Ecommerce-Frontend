export interface SupportRequestInterface {
    user_id?:number,
    order_id?:number,
    contact_name?:string,
    contact_email?:string,
    contact_phone?:string,
    topic:string,
    message:string,
    contact_preference:string,
    cf_turnstile_response:string
}

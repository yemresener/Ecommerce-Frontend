export interface CreateAcc {
    name:string,
    surname:string,
    password:string,
    phone_number?:string,
    agreements:boolean,
    marketing_consent:boolean
}

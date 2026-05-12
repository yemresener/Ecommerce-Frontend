export interface NewCardPayload {
    
    save_card: boolean | number;
    card_holder_name: string;
    card_number: string;
    expire_month: number;
    expire_year: number;
    cvc: string;
    installment: number;
    pre_info_at:boolean;
    dist_sales_at:boolean;

      
}

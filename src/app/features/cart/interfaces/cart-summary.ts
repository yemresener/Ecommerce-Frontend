export interface CartSummary {
    cartCount:number,
    productCount:number,
    quantitySum:number
    subTotal:number,

    cargoFee:number,
    cartCargoFee:number,
    remainingForFreeShipping:number,
    isFreeShippingEligible: boolean,
    freeShippingThreshold:number,

    originalTotal:number,
    discountTotal:number,
    couponDiscountTotal:number,
    installment_diff:number,
    total:number
}

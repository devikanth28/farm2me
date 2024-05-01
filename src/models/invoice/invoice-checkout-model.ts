import { InvoiceCheckoutItemModel } from "./invoice-checkout-item-model";

export interface InvoiceCheckoutModel {
    orderID: number,
    taxableAmount: number,
    taxAmount: number,
    discountAmount: number,
    paymentGatewayCharges: number,
    grossAmount: number,
    paymentModeID: number,
    orderInvoiceDetail: InvoiceCheckoutItemModel[];
}
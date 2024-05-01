import { OrderModel } from "../orders/order-list-model";
import { InvoiceCheckoutItemModel } from "./invoice-checkout-item-model";
import { InvoiceCheckoutModel } from "./invoice-checkout-model";

export const mapInvoiceData = (source: OrderModel): InvoiceCheckoutModel => {
  const mappedInvoiceItems: InvoiceCheckoutItemModel[] = source.orderDetail.map((item) => ({
    orderDetailID: item.orderDetailID,
    invoicedQuantity: item.pendingQuantity,
    totalAmount: Math.round((item.unitPrice * item.pendingQuantity) + (item.unitPrice * item.pendingQuantity * item.gst / 100))
  }));
  return {
    orderID: source.orderID,
    taxableAmount: source.taxableAmount,
    taxAmount: source.taxAmount,
    discountAmount: 0,
    paymentGatewayCharges: source.paymentGatewayCharges,
    grossAmount: Math.round(source.taxableAmount + source.taxAmount),
    paymentModeID: source.paymentModeID,
    orderInvoiceDetail: mappedInvoiceItems
  };
}

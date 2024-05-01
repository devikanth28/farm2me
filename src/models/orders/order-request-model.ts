export interface OrderRequestModel {
  userAddressID: number;
  taxableAmount: number;
  taxAmount: number;
  discountAmount: number;
  grossAmount: number;
  comment: string;
  paymentModeID: number;
  courierProviderID: number | null;
  courierCharges: number;
  packingCharges: number;
  handlingCharges: number;
  paymentGatewayCharges: number;
  orderDetail: {
    productID: number;
    unitPrice: number;
    quantity: number;
    taxableAmount: number;
    taxAmount: number;
    discountAmount: number;
    courierDocketNbr: string;
    grossAmount: number;
  }[];
}

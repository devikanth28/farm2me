import { UserAddress } from "../user-address-model";
import { ProductCheckoutModel } from "./product-checkout-model";

export interface ProductCheckoutProceedModel {
  id: string;
  totalItemCost: number;
  totalTax: number;
  deliveryHandlingCharges: number;
  grandItemTotal: number;
  items: ProductCheckoutModel[];
  address: UserAddress;
  paymentOption: {
    id: string;
    mode: string;
    code: string;
    status: string;
    description: string;
    dateTime: string;
  };
  comment: string;
  courierProviderID: number;
  courierCharges: number;
  packingCharges: number;
  handlingCharges: number;
  paymentGatewayCharges: number;
}

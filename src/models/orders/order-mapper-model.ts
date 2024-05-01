import { OrderRequestModel } from "./order-request-model";
import { ProductCheckoutProceedModel } from "../products/product-checkout-proceed-model";
import {
  calculateItemSum,
  calculateItemTotal,
  calculateTotalTax,
} from "../../components/products/product-calculation";
import Helpers from "../../utils/helpers";
import { AdminOrderRequestModel } from "./admin-order-request-model";

export const MapOrderData = (
  source: ProductCheckoutProceedModel
): OrderRequestModel => {
  return {
    userAddressID: source.address.userAddressID,
    taxableAmount: source.totalItemCost,
    taxAmount: source.totalTax,
    discountAmount: 0,
    grossAmount: source.grandItemTotal + source.courierCharges + source.packingCharges + source.paymentGatewayCharges,
    comment: source.comment,
    paymentModeID: +source.paymentOption.id,
    courierProviderID:
      source.courierProviderID === 0 ? null : source.courierProviderID,
    courierCharges: source.courierCharges,
    packingCharges: source.packingCharges,
    handlingCharges: source.deliveryHandlingCharges,
    paymentGatewayCharges: source.paymentGatewayCharges,
    orderDetail: source.items.map((item) => ({
      productID: item.id,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      taxableAmount: calculateItemSum(item.unitPrice, item.quantity),
      taxAmount: calculateTotalTax(item.unitPrice, item.quantity, item.tax),
      discountAmount: 0,
      courierDocketNbr: "",
      grossAmount: calculateItemTotal(
        item.unitPrice,
        item.quantity,
        calculateTotalTax(item.unitPrice, item.quantity, item.tax),
        0
      ),
      expectedDeliveryDate: Helpers.getNext7Days().toString(),
    })),
  };
};

export const AdminMapOrderData = (
  source: ProductCheckoutProceedModel,
  selectedAdminUserId: number
): AdminOrderRequestModel => {
  return {
    userID: selectedAdminUserId,
    userAddressID: source.address.userAddressID,
    taxableAmount: source.totalItemCost,
    taxAmount: source.totalTax,
    discountAmount: 0,
    grossAmount: source.grandItemTotal + source.courierCharges + source.packingCharges + source.paymentGatewayCharges,
    comment: source.comment,
    paymentModeID: +source.paymentOption.id,
    courierProviderID:
      source.courierProviderID === 0 ? null : source.courierProviderID,
    courierCharges: source.courierCharges,
    packingCharges: source.packingCharges,
    handlingCharges: source.deliveryHandlingCharges,
    paymentGatewayCharges: source.paymentGatewayCharges,
    orderDetail: source.items.map((item) => ({
      productID: item.id,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      taxableAmount: calculateItemSum(item.unitPrice, item.quantity),
      taxAmount: calculateTotalTax(item.unitPrice, item.quantity, item.tax),
      discountAmount: 0,
      courierDocketNbr: "",
      grossAmount: calculateItemTotal(
        item.unitPrice,
        item.quantity,
        calculateTotalTax(item.unitPrice, item.quantity, item.tax),
        0
      ),
      expectedDeliveryDate: Helpers.getNext7Days().toString(),
    })),
  };
};

import { ProductCheckoutProceedModel } from "./product-checkout-proceed-model";

export const MapOrderToOrderDetails = (
  sourceItem: any
): ProductCheckoutProceedModel => {
  return {
    id: sourceItem.orderID,
    totalItemCost: sourceItem.taxableAmount,
    totalTax: sourceItem.taxAmount,
    deliveryHandlingCharges: sourceItem.handlingCharges,
    grandItemTotal: sourceItem.grossAmount,
    items: sourceItem.orderDetail.map((i: any) => ({})),
    address: {
      address1: sourceItem.address1,
      address2: sourceItem.address2,
      userAddressID: sourceItem.shipmentAddressID,
      landmark: sourceItem.landmark,
      countryName: sourceItem.countryName,
      stateName: sourceItem.stateName,
      cityName: sourceItem.cityName,
      zipcode: sourceItem.zipcode,
      gpsLocation: sourceItem.gpsLocation,
      isPrimary: sourceItem.isPrimary,
      homeDeliveryAvailable: sourceItem.homeDeliveryAvailable,
    },
    paymentOption: {
      id: "0",
      dateTime: "",
      code: "",
      description: "",
      mode: "",
      status: "true",
    },
    comment: sourceItem.comment,
    courierProviderID: sourceItem.courierProviderID,
    courierCharges: sourceItem.courierCharges,
    packingCharges: sourceItem.packingCharges,
    handlingCharges: sourceItem.handlingCharges,
    paymentGatewayCharges: sourceItem.paymentGatewayCharges,
  };
};

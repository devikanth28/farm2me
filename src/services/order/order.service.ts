import ApiConstant from "../../constants/api.constants";
import api from "../api";
import { ProductCheckoutProceedModel } from "../../models/products/product-checkout-proceed-model";
import {
  MapOrderData,
  AdminMapOrderData,
} from "../../models/orders/order-mapper-model";

const tenantGuid = process.env.REACT_APP_TENAT_ID;

const setCustomerOrder = async (order: ProductCheckoutProceedModel) => {
  try {
    let data = MapOrderData(order);
    return await api
      .post(ApiConstant.setCustomerOrder, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  } catch {
    console.log("error in customer placing order");
  }
};

const setAdminCustomerOrder = async (
  order: ProductCheckoutProceedModel,
  selectedAdminUserId: number
) => {
  try {
    let data = AdminMapOrderData(order, selectedAdminUserId);
    return await api
      .post(ApiConstant.setAdminCustomerOrder, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then(function (response: any) {
        if (response) {
          return response.data;
        }
      })
      .catch(function (error) {
        return error;
      });
  } catch {
    console.log("error in customer placing order");
  }
};

const OrderService = {
  setCustomerOrder,
  setAdminCustomerOrder,
};

export default OrderService;

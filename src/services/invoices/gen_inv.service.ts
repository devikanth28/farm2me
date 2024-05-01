import ApiConstant from "../../constants/api.constants";
import api from "../api";
import { InvoiceCheckoutModel } from "../../models/invoice/invoice-checkout-model";

const GenerateNewInvoice = async (invoice: InvoiceCheckoutModel) => {
  try {
    return await api
      .post(ApiConstant.generateNewInvoice, invoice, {
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
    console.log("error in generating invoice");
  }
};

const InvoiceServices = {
    GenerateNewInvoice,
};

export default InvoiceServices;
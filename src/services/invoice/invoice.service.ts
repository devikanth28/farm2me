import { InvoiceMock } from "./invoice_mocks/invoice_mocks";
import { InvoiceItemsMock } from "./invoice_mocks/invoice_Items_mocks";

const getAllInvoice = async () => {
  try {
    const response = InvoiceMock;
    return response;
  } catch (error) {
    console.error("error reading invoice data.", error);
    throw error;
  }
};

const getAllInvoiceItems = async () => {
  try {
    const response = InvoiceItemsMock;
    return response;
  } catch (error) {
    console.error("error reading invoice Items data.", error);
    throw error;
  }
};

const InvoiceService = {
  getAllInvoice,
  getAllInvoiceItems,
};

export default InvoiceService;

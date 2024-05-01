export interface InvoiceItemModel {
  invoiceItemId: number;
  name: string;
  price: number;
  quantity: number;
  amount: number;
  tax: number;
  totalAmount: number;
  url: string;
}

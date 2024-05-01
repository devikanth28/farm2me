import InvoiceDetails from "../invoice/invoice-details";

const OrderReviewInvoiceDetails = (props: any) => {
  return (
    <>
      <InvoiceDetails invoiceData={props.orderInvoice} />
    </>
  );
};

export default OrderReviewInvoiceDetails;

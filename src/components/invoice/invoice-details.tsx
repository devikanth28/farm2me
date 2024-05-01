import InvoiceDataList from "./invoice-data-lists";

const InvoiceDetails = (props: any) => {
  return (
    <>
      {props.invoiceData.length > 0 ? (
        <InvoiceDataList invoiceData={props.invoiceData} invoiceItems={null} />
      ) : null}
    </>
  );
};

export default InvoiceDetails;

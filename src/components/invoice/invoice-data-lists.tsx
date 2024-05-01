import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Helpers from "../../utils/helpers";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import InviceItems from "./invoice-items";
import { InvoiceModel } from "../../models/invoice/invoice-model";

const InvoiceDataList = (invoiceData: any, invoiceItems: any) => {
  const op = useRef<any>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const taxAmountBodyTemplate = (invoice: any) => {
    return Helpers.formatAmountInINR(invoice.grossAmount);
  };

  const invoiceDateBodyTemplate = (invoice: any) => {
    const convertedDate = new Date(invoice.createdDate);
    const formattedDate = convertedDate.toLocaleDateString("en-gb", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return formattedDate;
  };
  const showInvoiceItemDetails = (e: any, data: any) => {
    setSelectedInvoice(data);
    op.current.toggle(e);
  };
  return (
    <>
      <DataTable
        value={invoiceData.invoiceData}
        tableStyle={{ minWidth: "50rem" }}
        size="small"
        selectionMode="single"
        onSelectionChange={(e) =>
          showInvoiceItemDetails(e.originalEvent, e.value)
        }
        dataKey="invoiceId"
        header="Invoice"
      >
        <Column field="invoiceNo" header="Invoice #"></Column>
        <Column
          field="createdDate"
          header="Invoice Date"
          body={invoiceDateBodyTemplate}
        ></Column>
        <Column
          field="grossAmount"
          header="Invoice Amount"
          body={taxAmountBodyTemplate}
        ></Column>
      </DataTable>
      <OverlayPanel ref={op} showCloseIcon>
        {selectedInvoice !== null ? (
          <InviceItems selectedInvoice={selectedInvoice} />
        ) : null}
      </OverlayPanel>
    </>
  );
};

export default InvoiceDataList;

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Helpers from "../../utils/helpers";
import { InvoiceItemModel } from "../../models/invoice/invoice-item-model";
import InvoiceService from "../../services/invoice/invoice.service";
import { useEffect, useState } from "react";

const InviceItems = (selectedInvoice: any) => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItemModel[]>([]);

  const totalAmountBodyTemplate = (invoice: any) => {
    return Helpers.formatAmountInINR(invoice.unitPrice);
  };

  useEffect(() => {
    InvoiceService.getAllInvoiceItems().then((response: any) => {
      setInvoiceItems(response);
    });
  });

  const headerTemplate = (
    <div className="grid">
      <div className="col-3">Invoice Details</div>
      <div className="col-3">
        Invoice #: {selectedInvoice?.selectedInvoice?.invoiceNo}
      </div>
      <div className="col-6">
        Invoice Date:{" "}
        {new Date(
          selectedInvoice?.selectedInvoice?.createdDate
        ).toLocaleDateString("en-gb", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );

  return (
    <>
      <DataTable
        header={headerTemplate}
        value={selectedInvoice.selectedInvoice.orderInvoiceDetail}
        tableStyle={{ minWidth: "50rem" }}
        size="small"
      >
        <Column field="productName" header="Name"></Column>

        <Column field="invoicedQuantity" header="Quantity"></Column>

        <Column
          field="unitPrice"
          header="Total"
          body={totalAmountBodyTemplate}
        ></Column>
      </DataTable>
    </>
  );
};

export default InviceItems;

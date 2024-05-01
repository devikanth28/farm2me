import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { ColumnDef, OrderModel } from "../../models/orders/order-list-model";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import OrderReview from "./order-review";

interface DataTableProps {
  data: any[];
}

const OrderListDataTable: React.FC<DataTableProps> = ({ data }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [dialogHeader, setDialogHeader] = useState(
    t("orderlist_orderdetails_label")
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [localFilter, setLocalFilter] = useState<string>(" ");

  const handleSetOrderData = (rowData: OrderModel) => {
    setSelectedOrder(rowData);
    setVisible(true);
  };

  useEffect(() => {
    if (selectedOrder !== null) setVisible(true);
  }, [selectedOrder]);

  const columns: ColumnDef[] = [
    {
      field: "orderID",
      header: t("orderlist_table_orderno"),
      sortable: true,
      style: { minWidth: "7rem" },
      cell: (row: any) => (
        <span
          style={{ color: "darkcyan", fontWeight: "bolder", cursor: "pointer" }}
          onClick={() => handleSetOrderData(row)}
        >
          {row.orderID}
        </span>
      ),
    },
    {
      field: "createdDate",
      header: t("orderlist_table_orderdate"),
      style: { minWidth: "9rem" },
      sortable: true,
      cell: (row: any) =>
        new Date(row.createdDate).toLocaleDateString("en-gb", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      field: "invoiceNumber",
      header: t("orderlist_table_invoiceno"),
      style: { minWidth: "8rem" },
      sortable: true,
      cell: (row: any) =>
        row.orderInvoice.length > 0 ? (
          <>
          <span style={{color: "darkcyan",fontWeight: "bolder" }}>
            {row.orderInvoice[0].invoiceNo}            
          </span>
          <span style={{color: 'green'}}>
            {row.orderInvoice.length>1 ? " (+" + String(row.orderInvoice.length-1) + ")" : ""}
          </span>
          </>
        ) : "",
    },
    {
      field: "invoiceDate",
      header: t("orderlist_table_invoicedate"),
      style: { minWidth: "10rem" },
      sortable: true,
      cell: (row: any) =>
        row.orderInvoice.length > 0 
          ? new Date(row.orderInvoice[0].createdDate).toLocaleDateString("en-gb", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          : "",
    },
    {
      field: "orderStatusName",
      header: t("orderlist_table_orderstatus"),
      style: { minWidth: "10rem" },
      sortable: true,
      cell: (row: any) => row.orderStatusName,
    },
    {
      field: "grossAmount",
      header: t("orderlist_table_totalvalue"),
      style: { minWidth: "9rem" },
      sortable: true,
      cell: (row: any) =>
        row.grossAmount.toLocaleString("en-gb", {
          style: "currency",
          currency: "INR",
        }),
    },
    {
      field: "paymentModeName",
      header: t("orderlist_table_paymenttype"),
      style: { minWidth: "10rem" },
      sortable: true,
      cell: (row: any) => row.paymentModeName,
    },
    {
      field: "userName",
      header: t("orderlist_table_username"),
      style: { minWidth: "10rem" },
      sortable: true,
      cell: (row: any) => row.userName,
    },
    {
      field: "primaryContactNbr",
      header: t("orderlist_table_mobile"),
      style: { minWidth: "8rem" },
      sortable: true,
      cell: (row: any) => row.primaryContactNbr,
    },
    {
      field: "userAddress",
      header: t("orderlist_table_address"),
      style: { minWidth: "20rem" },
      sortable: true,
      cell: (row: any) =>
        row.address1 +
        " " +
        row.address1 +
        " " +
        row.landmark +
        " Pin-" +
        row.zipcode,
    },
    {
      field: "cityName",
      header: t("orderlist_table_city"),
      style: { minWidth: "8rem" },
      sortable: true,
      cell: (row: any) => row.cityName,
    },
    {
      field: "stateName",
      header: t("orderlist_table_state"),
      style: { minWidth: "8rem" },
      sortable: true,
      cell: (row: any) => row.stateName,
    },
    {
      field: "gstNumber",
      header: t("orderlist_table_gstno"),
      style: { minWidth: "8rem" },
      sortable: true,
      cell: (row: any) => row.gstNumber,
    },
  ];

  const hideDialog = () => {
    setVisible(false);
    setDialogHeader(t("orderlist_orderdetails_label"));
  };

  const clearFilter = () => {
    setLocalFilter("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <span className="p-input-icon-left border-1 border-primary">
          <i className="pi pi-filter" />
          <InputText
            type="search"
            onChange={(e) => {
              setLocalFilter(e.target.value);
            }}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      <div className="col-12">
        <div className="card border-noround p-2">
          <DataTable
            value={data}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            stripedRows
            showGridlines
            globalFilter={localFilter || " "}
            header={header}
            emptyMessage="No order found."
            sortMode="multiple"
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            {columns.map((col, i) => (
              <Column
                key={i}
                field={col.cell}
                sortable
                header={col.header}
                style={col.style}
              />
            ))}
          </DataTable>
        </div>
        {selectedOrder !== undefined || selectedOrder !== null ? (
          <Dialog
            header={dialogHeader}
            visible={visible}
            style={{ width: "67vw" }}
            onHide={hideDialog}
            className="orderlist-dialog"
          >
            <OrderReview OrderData={selectedOrder} />
          </Dialog>
        ) : null}
      </div>
    </>
  );
};
export default OrderListDataTable;

import { DataTable, DataTableExpandedRows, DataTableValueArray } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { ColumnDef, OrderDetail, OrderModel } from "../../models/orders/order-list-model";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import OrderReview from "../orders/order-review";
import { Toast, ToastMessage } from 'primereact/toast';
import CreateInvoice from "./create-invoice";
import InvoiceServices from "../../services/invoices/gen_inv.service";
import { mapInvoiceData } from "../../models/invoice/invoice-mapper-model";

interface DataTableProps {
  query: string;
  openOrder: boolean;
  onSearch: (query: string, openOrder: boolean) => void;
  data: any[];
}

const InvoicesDataTable: React.FC<DataTableProps> = ({ data, onSearch, query, openOrder }) => {

  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const [editOrder, setEditOrder] = useState<OrderModel | null>(null);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
  
  const showMessage = (event: React.MouseEvent<HTMLButtonElement>, message: string, severity: ToastMessage['severity']) => {
    const target = event.target as HTMLButtonElement;
    const label = target.innerText;
    toast.current?.show({ severity: severity, summary: label, detail: message, life: 3000 });
  };

  const handleSetOrderData = (rowData: OrderModel) => {
    setSelectedOrder(rowData);
    setDetailVisible(true);
  };

  const handleSetEditInvoice = (rowData: OrderModel) => {
    setEditOrder(rowData);
    setEditVisible(true);
  };

  const handleCreateInvoice = async (event: any, rowData: OrderModel) => {
    try
    {
      const invoiceData = mapInvoiceData(rowData);
      let response = await InvoiceServices.GenerateNewInvoice(invoiceData);
      if(response.id > 0) {
        showMessage(event, 'Invoice #' + response.id +' generated successfully', 'success');
        onSearch(query,openOrder);
      }
      else
      {
        showMessage(event, response.message + ': Error in generate invoice', 'error');
      }
    }
    catch
    {
      showMessage(event, 'Error in generate invoice', 'error');
    }
  };

  useEffect(() => {
    if (selectedOrder !== null)
    setDetailVisible(true);
  }, [selectedOrder]);

  useEffect(() => {
    if (editOrder !== null)
    setEditVisible(true);
  }, [editOrder]);

  const expandedColumns: ColumnDef[] = [
    {
      header: "Sl.",
      style: { minWidth: "1rem" },
      cell: (row: any) => 1,
    },
    {
      header: "Product Name",
      style: { minWidth: "10rem" },
      cell: (row: any) => row.productName,
    },
    {
      header: "Ordered Quantity",
      style: { minWidth: "8rem" },
      cell: (row: any) => row.quantity + " " + row.measurementTypeName
    },
    {
      header: "Pending Quantity",
      style: { minWidth: "8rem" },
      cell: (row: any) => row.pendingQuantity + " " + row.measurementTypeName
    }
  ];  
  
  const columns: ColumnDef[] = [
    {
      style: { minWidth: "2rem" },
      expander: (row: any) => row.orderStatusID === 1 && isPendingQuantity(row.orderDetail)
    },    
    {      
      field: "orderID",
      header: t("orderlist_table_orderno"),
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
      cell: (row: any) =>
        new Date(row.createdDate).toLocaleDateString("en-gb", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      field: "orderStatusName",
      header: t("orderlist_table_orderstatus"),
      style: { minWidth: "10rem" },
      cell: (row: any) => row.orderStatusName,
    },
    {
      field: "userName",
      header: t("orderlist_table_username"),
      style: { minWidth: "10rem" },
      cell: (row: any) => row.userName,
    },
    {
      field: "primaryContactNbr",
      header: t("orderlist_table_mobile"),
      style: { minWidth: "8rem" },
      cell: (row: any) => row.primaryContactNbr,
    },    
    {
      field: "invoiceNumber",
      header: t("orderlist_table_invoiceno"),
      style: { minWidth: "8rem" },
      cell: (row: any) =>
        row.orderInvoice.length > 0 ? (
          <>
          <span style={{color: "darkcyan",fontWeight: "bolder",cursor: "pointer"}} onClick={() => handleSetOrderData(row)}>
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
      header: "Route Code",
      style: { minWidth: "8rem" },
      cell: (row: any) => row.routeCodeName,
    }
  ];

  const isPendingQuantity = (items: OrderDetail[]): boolean => {    
    return items.some((item) => item.pendingQuantity > 0);
  }

  const hideDetailDialog = () => {
    setDetailVisible(false);
  };

  const hideEditDialog = () => {
    setEditVisible(false);
  };

  const rowExpansionTemplate = (data: OrderModel) => {
    return (
        <div className="p-3">            
            <div className="border-1 flex">              
              <div style={{width:'75%'}}>
              <DataTable value={data.orderDetail}>
                {expandedColumns.map((col, i) => (
                  <Column
                    key={i}
                    field={col.cell}
                    header={col.header}
                    style={col.style}
                  />
                ))}                
              </DataTable>
              </div>
              <div style={{width:'25%'}}>
                <Button label="Generate Invoice" className="border-round mt-2 mr-2 ml-5" onClick={(e) => handleCreateInvoice(e, data)} style={{ width: "80%", textAlign:'center' }} severity="success"/><br/>
                <Button className="border-round mt-2 mr-2 ml-5" onClick={() => handleSetEditInvoice(data)} style={{ width: "80%", textAlign:'center' }} severity="info">
                  {t("invoices_create_edit_button")}
                </Button>
              </div>
            </div>
        </div>
    );
  };

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <div className="col-12">
        <div className="card border-noround p-2">
          <DataTable
            value={data}
            expandedRows={expandedRows} 
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            paginator rows={10}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            stripedRows
            emptyMessage="No order found."
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            {columns.map((col, i) => (
              <Column
                key={i}
                expander={col.expander}
                field={col.cell}
                header={col.header}
                style={col.style}
              />
            ))}
          </DataTable>
        </div>
        {editOrder !== undefined || editOrder !== null ? (
          <Dialog
            header={t("generateInv_edit_label")}
            visible={editVisible}
            style={{ width: "67vw" }}
            onHide={hideEditDialog}
            className="orderlist-dialog"
          >
            <CreateInvoice runHideDialog={hideEditDialog} runCreateInvoice={handleCreateInvoice} OrderData={editOrder} />
          </Dialog>
        ) : null}
        {selectedOrder !== undefined || selectedOrder !== null ? (
          <Dialog
            header={t("orderlist_orderdetails_label")}
            visible={detailVisible}
            style={{ width: "67vw" }}
            onHide={hideDetailDialog}
            className="orderlist-dialog"
          >
            <OrderReview OrderData={selectedOrder} />
          </Dialog>
        ) : null}
      </div>
    </>
  );
};
export default InvoicesDataTable;

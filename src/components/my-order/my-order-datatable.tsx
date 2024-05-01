import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { ColumnDef, OrderModel } from "../../models/orders/order-list-model";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Dropdown } from "primereact/dropdown";
import { ListBox } from "primereact/listbox";
import OrderReview from "../orders/order-review";
import myOrderServices from "../../services/orders/myorder.service";
import { getSeverity } from "../../services/order/order-list.-mock";
import { Button } from "primereact/button";

interface DataTableProps {
  data: any[];
  onSearch: (query: string) => void;
}

const MyOrderDataTable: React.FC<DataTableProps> = ({ data, onSearch }) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [dialogHeader, setDialogHeader] = useState(
    t("orderlist_orderdetails_label")
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderModel | null>(null);
  const currentYear = new Date().getFullYear();
  const [filterYear, setFilterYear] = useState<number>(currentYear);
  const [localFilter, setLocalFilter] = useState<string>(" ");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [rowId, setRowId] = useState<number>();
  const [yearList, setYearList] = useState<number[]>([]);

  useEffect(() => {
    const generateYearList = () => {
      const years = [];
      for (let year = 2023; year <= currentYear; year++) {
        years.push(year);
      }
      setYearList(years);
    };
    generateYearList();
  }, []);

  const menuOptions = [
    { label: "Return", value: "8" },
    { label: "Cancel", value: "7" },
  ];

  const handleMenuOptionChange = async (e: { value: string }) => {
    myOrderServices.updateOrderStatus({
      orderID: rowId,
      orderStatusID: e.value,
    });
    setShowDropdown(!showDropdown);
    onSearch("/" + filterYear);
  };

  const onButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSetOrderData = (rowData: OrderModel) => {
    setSelectedOrder(rowData);
    setVisible(true);
  };

  useEffect(() => {
    if (selectedOrder !== null) setVisible(true);
  }, [selectedOrder]);

  useEffect(() => {
    const searchFilter: string = "/" + filterYear;
    onSearch(searchFilter);
  }, [filterYear]);

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
      style: { minWidth: "8rem" },
      sortable: true,
      cell: (row: any) =>
        new Date(row.createdDate).toLocaleDateString("en-gb", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
    },
    {
      field: "imagePath",
      header: t("myOrders_productDetail"),
      style: { minWidth: "15rem" },
      cell: (row: any) => (
        <div
          style={{ cursor: "pointer", display: "flex" }}
          onClick={() => handleSetOrderData(row)}
        >
          <img src={row.orderDetail[0].url} alt="" width="20%" />
          <div className="pl-2 pt-2">
            {row.orderDetail[0].productName} <br />{" "}
            <span style={{ color: "green" }}>
              {row.orderDetail.length > 1
                ? " +" + String(row.orderDetail.length - 1) + " more"
                : ""}
            </span>
          </div>
        </div>
      ),
    },
    {
      field: "orderStatusName",
      header: t("orderlist_table_orderstatus"),
      style: { minWidth: "10rem" },
      sortable: true,
      cell: (row: any) => (
        <div style={{ textAlign: "center" }}>
          <Tag
            value={row.orderStatusName}
            severity={getSeverity(row.orderStatusID)}
          />
        </div>
      ),
    },
    {
      field: "grossAmount",
      header: t("orderlist_table_totalvalue"),
      style: { minWidth: "9rem" },
      sortable: true,
      cell: (row: any) => (
        <div style={{ textAlign: "right" }}>
          {row.grossAmount.toLocaleString("en-gb", {
            style: "currency",
            currency: "INR",
          })}
        </div>
      ),
    },
    {
      field: "paymentModeName",
      header: t("orderlist_table_paymenttype"),
      style: { minWidth: "10rem" },
      sortable: true,
      cell: (row: any) => row.paymentModeName,
    },
    {
      field: "userAddress",
      header: t("myOrders_shippingAddress"),
      style: { minWidth: "18rem" },
      sortable: true,
      cell: (row: any) =>
        row.address1 +
        " " +
        row.address2 +
        " " +
        row.landmark +
        " " +
        row.cityName +
        " " +
        row.stateName +
        " Pin- " +
        row.zipcode,
    },
    // {
    //   cell: (row: any) => (
    //     <>
    //       {row.orderID === rowId ? (
    //         <div
    //           className="ml-4"
    //           style={{
    //             display: showDropdown ? "block" : "none",
    //             position: "absolute",
    //           }}
    //         >
    //           <ListBox
    //             options={menuOptions}
    //             onChange={handleMenuOptionChange}
    //           />
    //         </div>
    //       ) : (
    //         ""
    //       )}
    //       {row.orderStatusID === 1 ? (
    //         <i
    //           className="pi pi-ellipsis-v"
    //           onClick={() => {
    //             onButtonClick();
    //             setRowId(row.orderID);
    //           }}
    //         />
    //       ) : (
    //         ""
    //       )}
    //     </>
    //   ),
    // },
  ];

  const hideDialog = () => {
    setVisible(false);
    setDialogHeader(t("orderlist_orderdetails_label"));
  };

  const footer = (
    <>
      <Button
        onClick={hideDialog}
        label="Cancel"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <div className="ml-1 mt-1">
          <span style={{ color: "red", fontSize: "18px" }}>{data.length}</span>
          {t("myOrders_placedInYear")} {filterYear}
        </div>
        <div className="font-bold text-white border-round ml-2">
          <Dropdown
            options={yearList}
            value={filterYear}
            onChange={(e) => setFilterYear(e.value)}
            style={{ float: "left", minWidth: "6rem" }}
          />
        </div>
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
            globalFilter={localFilter || " "}
            header={header}
            emptyMessage="No order found."
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
          >
            {columns.map((col, i) => (
              <Column
                key={i}
                field={col.cell}
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
export default MyOrderDataTable;

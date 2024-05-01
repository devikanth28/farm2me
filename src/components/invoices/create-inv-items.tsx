import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Helpers from "../../utils/helpers";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Suspense, useEffect, useState } from "react";
import { OrderDetail } from "../../models/orders/order-list-model";
import AppLoading from "../app-loading/app-loading";
import ItemDeleteDialog from "./item-delete-dialog";
import { calculateItemSum, calculateItemTotal, calculateTotalTax } from "../products/product-calculation";
import CreateInvoiceTotal from "./create-inv-total";
import { useTranslation } from "react-i18next";

const CreateInvoiceItems = (props: any) => {
  
  const { t } = useTranslation();
  const [orderData, setOrderData] = useState<OrderDetail[]>([]);
  const [checkoutItem, setCheckoutItem] = useState<OrderDetail>();
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try
      {
        setOrderData(props.orderedItems.orderDetail);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setGrandTotal(calculateTotalItems());
    setTotalTax(calculateTotalTaxItems());
    props.updateItems(orderData, calculateTotalItems(), calculateTotalTaxItems());
  }, [orderData]);

  const calculateTotalItems = () => {
    return orderData.reduce(
      (total, item) => total + item.pendingQuantity * (item.unitPrice || 0),
      0
    );
  };

  const calculateTotalTaxItems = () => {
    return orderData.reduce(
      (total, item) => total + item.pendingQuantity * (item.unitPrice || 0) * (item.gst / 100),
      0
    );
  };

  const calculateTotalWeight = () => {
    return orderData.reduce(
      (total, item) => total + item.pendingQuantity,
      0
    );
  };
  
  const imageBodyTemplate = (item: any) => {
    return (
      <img
        src={
          item.url === undefined
            ? process.env.PUBLIC_URL +
              "/assests/images/Desiri-Groundnut-Oils.png"
            : item.url
        }
        alt=""
        width="90%"
      />
    );
  };

  const unitPriceBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(product.unitPrice);
  };

  const quantityTemplate = (product: any) => {
    return (
      <>
      <div className="flex product-item product-wrapper">
        <div className="product-list-quantity">
          <InputNumber
            inputId={String(product.orderID)}
            style={{ width: 120 }}
            value={product.pendingQuantity}
            onClick={(e) => updateItemsQuantity(e, product.productID)}
            showButtons
            buttonLayout="horizontal"
            step={product.orderMultiples}
            decrementButtonClassName="p-button-danger"
            className="quantity-border"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            min={product.minOrderQty}
          />
        </div>
        <div className="product-list-button ml-2">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => deleteItem(product)}
            raised
          />
        </div>
      </div>
      </>
    );
  };

  const deleteItem = (item: any) => {
    setCheckoutItem(item);
    setNotifyHeader("Delete Item");
    setNotifyMessage("Are you sure you want to delete this item?");
    setIsNotifyVisible(true);
  };

  const hideNotifyDialog = (value: boolean) => {
    if (value) {
      deleteCheckoutItem();      
    }
    setIsNotifyVisible(false);
  };

  const deleteCheckoutItem = () => {    
    const updatedData = orderData.filter(
      (product) => product.productID !== checkoutItem?.productID
    );
    setOrderData(updatedData);    
  };

  const updateItemsQuantity = (event: any, id: number) => {
    if (
      event.target.dataset.pcSection === "incrementiconprops" ||
      event.target.dataset.pcSection === "incrementbutton"
    ) 
    {
      setOrderData((prevState) =>
        prevState.map((item) =>
          item.productID === id 
          ? { ...item, pendingQuantity: item.pendingQuantity + item.orderMultiples } 
          : item
        )
      );
    }

    if (
      event.target.dataset.pcSection === "decrementiconprops" ||
      event.target.dataset.pcSection === "decrementbutton"
    ) 
    {
      setOrderData((prevState) =>
        prevState.map((item) =>
          item.productID === id && item.pendingQuantity >= (2*item.orderMultiples)
            ? { ...item, pendingQuantity: item.pendingQuantity - item.orderMultiples }
            : item
        )
      );
    }
  };

  const taxableAmountBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(
      calculateItemSum(product.unitPrice, product.pendingQuantity)
    );
  };

  const taxAmountBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(
      calculateTotalTax(product.unitPrice, product.pendingQuantity, product.gst)
    );
  };

  const grossAmountBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(
      calculateItemTotal(product.unitPrice, product.pendingQuantity, calculateTotalTax(product.unitPrice,product.pendingQuantity, product.gst), 0)
    );
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <DataTable
          value={orderData.length>0?orderData.filter(x=> x.pendingQuantity>0):[]}
          tableStyle={{ minWidth: "50rem" }}
          size="small"
        >
          <Column style={{ width: "5%", marginLeft: "8rem" }} body={imageBodyTemplate}></Column>
          <Column
            field="productName"
            style={{ width: "20%" }}
            header= {t("invoices_product_name")}
          ></Column>        
          <Column
            field="unitPrice"
            header={t("invoices_product_price")}
            body={unitPriceBodyTemplate}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="quantity"
            style={{ width: "5%"}}
            header={t("invoices_product_quantity")}
            body={quantityTemplate}
          ></Column>
          <Column
            field="taxableAmount"
            header={t("invoices_product_amount")}
            body={taxableAmountBodyTemplate}
            bodyStyle={{ textAlign: "right" }}
          ></Column>
          <Column
            field="taxAmount"
            header={t("invoices_product_tax")}
            body={taxAmountBodyTemplate}
            bodyStyle={{ textAlign: "right" }}
          ></Column>
          <Column
            field="grossAmount"
            header={t("invoices_product_tot_amount")}
            body={grossAmountBodyTemplate}
            bodyStyle={{ textAlign: "right" }}
          ></Column>
        </DataTable>
        <ItemDeleteDialog
            messageHeader={notifyHeader}
            notifyMessage={notifyMessage}
            isVisible={isNotifyVisible}
            isHide={hideNotifyDialog}
        />
        {grandTotal > 0 ? (       
          <CreateInvoiceTotal 
            taxableAmount={grandTotal} 
            taxAmount={totalTax}
            orderedItems={props.orderedItems}
          />
        ) : null}
      </Suspense>
    </>
  );
};
export default CreateInvoiceItems;
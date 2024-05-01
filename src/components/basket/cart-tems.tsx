import React, { useEffect, useState } from "react";
import { OrderList } from "primereact/orderlist";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { useTranslation } from "react-i18next";
import { ProductCheckoutModel } from "../../models/products/product-checkout-model";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import {
  calculateItemSum,
  calculateItemTotal,
  calculateTotalTax,
} from "../products/product-calculation";
import Helpers from "../../utils/helpers";
import { useAppDispatch } from "../../redux/hooks";
import { itemCount } from "../../redux/slices/counter";
import { Tag } from "primereact/tag";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";
const ItemsSummary = lazy(() => import("./items-summary"));
const ItemDeleteDialog = lazy(() => import("./item-delete-dialog"));

const CartItems = () => {
  var navigate = useNavigate();
  const [value18, setValue18] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [productCheckoutToLocal, setProductCheckoutToLocal] = useState<
    ProductCheckoutModel[]
  >(JSON.parse(localStorage.getItem("checkout-items") || "[]"));
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<ProductCheckoutModel>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  const loadDataFromLocalStorage = () => {
    // if (localStorage.getItem("checkout-items")) {
    //   const localData = localStorage.getItem("checkout-items");
    //   const parsedData = JSON.parse(localData !== null ? localData : "");
    //   setProductCheckoutToLocal(parsedData);
    //   dispatch(itemCount(parsedData.length));
    // }
    const data = ProductStorageHelpers.GetProductStorage();
    if (data !== undefined) {
      dispatch(itemCount(data.length));
      setProductCheckoutToLocal(data);
    }
  };

  useEffect(() => {
    setGrandTotal(calculateTotalItems());
    setTotalTax(calculateTotalTaxItems());
    localStorage.setItem(
      "total-weight",
      JSON.stringify(calculateTotalWeight())
    );
  }, [productCheckoutToLocal]);

  const calculateTotalItems = () => {
    return productCheckoutToLocal.reduce(
      (total, item) => total + item.quantity * (item.unitPrice || 0),
      0
    );
  };

  const calculateTotalTaxItems = () => {
    return productCheckoutToLocal.reduce(
      (total, item) =>
        total + item.quantity * (item.unitPrice || 0) * (item.tax / 100),
      0
    );
  };

  const calculateTotalWeight = () => {
    return productCheckoutToLocal.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const updateItemsQuantity = (event: any, id: number) => {
    const productIndex = productCheckoutToLocal.findIndex(
      (product) => product.id === id
    );
    if (
      event.target.dataset.pcSection === "incrementiconprops" ||
      event.target.dataset.pcSection === "incrementbutton"
    ) {
      setProductCheckoutToLocal((prevState) =>
        prevState.map((item) =>
          item.id === id &&
          item.quantity >= item.minQuantity + item.orderMultiples
            ? { ...item, quantity: item.quantity + item.orderMultiples }
            : item
        )
      );
      const updatedProducts = [...productCheckoutToLocal];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity:
          updatedProducts[productIndex].quantity +
          updatedProducts[productIndex].orderMultiples,
      };
      setProductCheckoutToLocal(updatedProducts);
      ProductStorageHelpers.SetProductStorage(updatedProducts);
    }

    if (
      event.target.dataset.pcSection === "decrementiconprops" ||
      event.target.dataset.pcSection === "decrementbutton"
    ) {
      setProductCheckoutToLocal((prevState) =>
        prevState.map((item) =>
          item.id === id &&
          item.quantity >= item.minQuantity + item.orderMultiples
            ? { ...item, quantity: item.quantity - item.orderMultiples }
            : item
        )
      );
      const updatedProducts = [...productCheckoutToLocal];
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity:
          updatedProducts[productIndex].quantity -
          updatedProducts[productIndex].orderMultiples,
      };
      setProductCheckoutToLocal(updatedProducts);
      ProductStorageHelpers.SetProductStorage(updatedProducts);
    }
  };

  const deleteItem = (item: any) => {
    setCheckoutItem(item);
    setNotifyHeader("Delete Item");
    setNotifyMessage("Are you sure you want to delete this record?");
    setIsNotifyVisible(true);
  };

  const hideNotifyDialog = (value: boolean) => {
    if (value) {
      deleteCheckoutItem();
      dispatch(itemCount(productCheckoutToLocal.length - 1));
    }
    setIsNotifyVisible(false);
  };

  const deleteCheckoutItem = () => {
    const updatedProductCheckout = productCheckoutToLocal.filter(
      (product) => product.id !== checkoutItem?.id
    );
    setProductCheckoutToLocal(updatedProductCheckout);
    // localStorage.setItem(
    //   "checkout-items",
    //   JSON.stringify(updatedProductCheckout)
    // );
    ProductStorageHelpers.SetProductStorage(updatedProductCheckout);
  };

  const itemTemplate = (item: {
    image: any;
    id: number;
    quantity: number;
    courierAvailable: boolean;
    inStock: string;
    minOrderQty: number;
    orderMultiples: number;
    media: any;
    name:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined;
    category:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | React.ReactPortal
      | Iterable<React.ReactNode>
      | null
      | undefined;
    unitPrice: number;
    tax: number;
    minQuantity: number;
    inventoryStatus:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined;
  }) => {
    return (
      <div className="product-item product-wrapper">
        <div className="img-details align-items-center">
          <div className="image-container">
            <img
              src={
                item.media[0] !== undefined
                  ? item.media[0].url
                  : process.env.PUBLIC_URL +
                    "/assests/images/Desiri-Groundnut-Oils.png"
              }
              alt="no-name"
            />
          </div>
          <div className="product-list-detail">
            {!item.courierAvailable ? (
              <Tag
                icon="pi pi-truck"
                severity="danger"
                value="Courier-Unavailable"
              ></Tag>
            ) : null}
            <h5 className="mb-2">{item.name}</h5>
            <span className="product-category font-semibold">
              {Helpers.formatAmountInINR(item.unitPrice)}
            </span>
          </div>
        </div>
        <div className="product-list-quantity">
          <InputNumber
            style={{ width: 110 }}
            inputId={String(item.id)}
            value={item.quantity}
            onClick={(e) => updateItemsQuantity(e, item.id)}
            showButtons
            buttonLayout="horizontal"
            step={item.orderMultiples}
            decrementButtonClassName={
              item.quantity === item.minQuantity ? "p-disabled" : ""
            }
            className="quantity-border"
            incrementButtonClassName="p-button-success"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            min={item.minQuantity}
          />
        </div>
        <div className="product-list-action text-sm">
          <span className="text-900">Taxable :</span>
          <span className="text-900">Tax :</span>
          <span className="text-900">Total :</span>
          {/* <span className={`product-badge status-${item.inventoryStatus}`}>{item.inventoryStatus}</span> */}
        </div>
        <div className="product-list-action text-sm">
          <span className="text-900">
            {Helpers.formatAmountInINR(
              calculateItemSum(
                item.unitPrice,
                value18 === 0 ? item.quantity : value18
              )
            )}{" "}
          </span>
          <span className="text-900">
            {Helpers.formatAmountInINR(
              calculateTotalTax(
                item.unitPrice !== undefined ? item.unitPrice : 0,
                item.quantity,
                item.tax
              )
            )}
          </span>
          <span className="text-900">
            {Helpers.formatAmountInINR(
              calculateItemTotal(
                item.unitPrice !== undefined ? item.unitPrice : 0,
                item.quantity,
                calculateTotalTax(
                  item.unitPrice !== undefined ? item.unitPrice : 0,
                  item.quantity,
                  item.tax
                ),
                0
              )
            )}
          </span>
        </div>
        <div className="product-list-button">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            onClick={() => deleteItem(item)}
            raised
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <div className="p-fluid grid pd-3" style={{ marginRight: 0 }}>
          <div className="field col-12 md:col-12 lg:col-8">
            <div className="orderlist-demo">
              <div className="card item-list-card p-0 m-0 overflow-hidden border-noround h-full">
                {productCheckoutToLocal.length > 0 ? (
                  <OrderList
                    value={productCheckoutToLocal}
                    listStyle={{ height: "auto" }}
                    dataKey="id"
                    className="border-none"
                    itemTemplate={itemTemplate}
                  ></OrderList>
                ) : null}
                <div className="">
                  <Button
                    label={t("continue_shopping")}
                    size="small"
                    className="flex-1 prime-button m-1 shopping-btn font-bold"
                    onClick={() => navigate(RouteConstant.products)}
                    raised
                    icon="pi pi-cart-plus"
                    severity="secondary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field col-12 md:col-12 lg:col-4">
            {grandTotal > 0 ? (
              <ItemsSummary
                total={grandTotal}
                orderItems={productCheckoutToLocal}
                totalTax={totalTax}
              />
            ) : null}
          </div>
        </div>

        <ItemDeleteDialog
          messageHeader={notifyHeader}
          notifyMessage={notifyMessage}
          isVisible={isNotifyVisible}
          isHide={hideNotifyDialog}
        />
      </Suspense>
    </>
  );
};

export default CartItems;

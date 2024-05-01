import OrderDetailsTop from "./order-details-top";
import DeliveryDetails from "./delivery-details";
import OrderItems from "./order-items";
import OrderTotal from "./order-total";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ProductCheckoutProceedModel } from "../../models/products/product-checkout-proceed-model";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import OrderService from "../../services/order/order.service";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { itemCount } from "../../redux/slices/counter";
import { selectedPayment } from "../../redux/slices/payments";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";
import { selectedGetway } from "../../redux/slices/getway-link";
import { GetWayLinkModel } from "../../models/getway-link/getway-link-model";
import "./order.scss";
const OrderConfirmDialog = lazy(() => import("./order-details-dialog"));

const OrderDetails = () => {
  const [cartData, setCartData] = useState<ProductCheckoutProceedModel>();
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [orderId, setOrderId] = useState(0);
  var navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useRef<any>(null);

  const c = useAppSelector((state) => state.comment);
  const isAdmin = useAppSelector((state) => state.isAdmin);
  const selectedAdminUserId = useAppSelector(
    (state) => state.adminUser.selectedAdminUserId
  );

  const showOrderSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Order Created Successfully!",
      life: 3000,
    });
  };

  const showOrderFailedError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: "Failed to Creating Order.",
      life: 3000,
    });
  };

  useEffect(() => {
    getOrderedItemsLocal();
  }, []);

  const getOrderedItemsLocal = () => {
    const orderedData:ProductCheckoutProceedModel = ProductStorageHelpers.GetProcessedProductStorage();
    if (orderedData !== null) {
      let total: number = orderedData.totalItemCost + orderedData.totalTax;
      let packingCharges = calculatePackingCharges(orderedData.address.homeDeliveryAvailable, total);
      let courierCharges = getTotalCourierCharges();
      orderedData.courierProviderID = getCourierProviderId();
      orderedData.courierCharges = courierCharges
      orderedData.packingCharges = packingCharges;   
      orderedData.paymentGatewayCharges = calculatePaymentGetwayCharges(orderedData.paymentOption.mode, total + courierCharges + packingCharges);
      setItems(orderedData);
    }
  };

  const setItems = (data: ProductCheckoutProceedModel) => {    
    ProductStorageHelpers.SetProcessedProductStorage(data);
    setCartData(data);
  };

  const calculatePackingCharges = (isHomeDelivery: boolean, totalAmount: number) => {
    if (!isHomeDelivery && totalAmount <= 2500) {
      return 100;
    } else {
      return 0;
    }
  };

  const calculatePaymentGetwayCharges = (paymentMode: string, totalAmount: number) => {
    if (paymentMode === "Cash On Delivery" || paymentMode === "UPI") {
      return 0;
    } else {
      const getwayCharge = (totalAmount * 2) / 100;
      return getwayCharge;
    }
  };

  const confirmOrder = () => {
    deleteLocalStorageData();
    saveCustomerOrder();
    setIsConfirmDialog(true);
  };

  const updateItem = () => {
    navigate(RouteConstant.basket);
  };

  const saveCustomerOrder = async () => {
    cartData!.comment = c;
    if (cartData !== undefined) {
      let response;
      if (isAdmin) {
        response = await OrderService.setAdminCustomerOrder(
          cartData,
          selectedAdminUserId
        );
      } else {
        response = await OrderService.setCustomerOrder(cartData);
      }
      if (response.isSuccess) {
        setOrderId(response.id);
        if (
          cartData.paymentOption.mode === "Cash On Delivery" ||
          cartData.paymentOption.mode === "Payment Link"
        ) {
        } else {
          const getwayData = response.additionalInfo;
          dispatch(selectedGetway(mapAdditionalInfo(getwayData)));
        }
        showOrderSuccess();
      } else {
        showOrderFailedError();
      }
    }
  };

  const mapAdditionalInfo = (data: any): GetWayLinkModel => {
    return {
      paymentURL: data.paymentURL,
      expectedDeliveryDate: data.expectedDeliveryDate,
    };
  };

  const getTotalCourierCharges = (): number => {
    const serializedCharges = localStorage.getItem("courier-charges");
    let totalCourierCharges = 0;
    if (serializedCharges !== null) {
      totalCourierCharges = JSON.parse(serializedCharges!.toString());
    }
    return totalCourierCharges;
  }

  const getCourierProviderId = (): number => {
    const courierData = localStorage.getItem("courier-provider");
    let providerId = 0;
    if (courierData !== null) {
      const parsedData = JSON.parse(courierData);
      providerId = parsedData.courierProviderID;
    }
    return providerId;
  };

  const deleteLocalStorageData = () => {
    ProductStorageHelpers.ClearAllLocalStorage();
    localStorage.removeItem("processed-items");
    localStorage.removeItem("checkout-items");
    localStorage.removeItem("courier-provider");
    localStorage.removeItem("courier-charges");
    localStorage.removeItem("total-weight");
    dispatch(itemCount(0));
    dispatch(selectedPayment(null));
  };

  const hideConfirmDialog = () => {
    setIsConfirmDialog(false);
    navigate(RouteConstant.products);
  };

  const showGetwayPage = () => {
    setIsConfirmDialog(false);
    navigate(RouteConstant.getwayProcess);
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <Toast ref={toast} />
        <div className="flex flex-column  border-1  surface-border box-shadow-none">
          {cartData ? (
            <>
              <OrderDetailsTop />
              <DeliveryDetails
                address={cartData?.address}
                paymentOption={cartData?.paymentOption}
              />
              <OrderItems cartItemDetails={cartData?.items} />
              <OrderTotal
                totalItemCost={cartData.totalItemCost}
                totalTax={cartData.totalTax}
                deliveryHandlingCharges={cartData.deliveryHandlingCharges}
                grandItemTotal={cartData.grandItemTotal}
                confirmOrder={confirmOrder}
                updateItem={updateItem}
                paymentMode={cartData.paymentOption.mode}
                comment={cartData.comment}
                courierCharges={cartData.courierCharges}
                packingCharges={cartData.packingCharges}
                paymentGatewayCharges={cartData.paymentGatewayCharges}
              />
            </>
          ) : null}
        </div>
        {cartData ? (
          <OrderConfirmDialog
            showConfirmDialog={isConfirmDialog}
            hideConfirmDialog={hideConfirmDialog}
            orderDetails={cartData}
            orderId={orderId}
            showGetwayPage={showGetwayPage}
          />
        ) : null}
      </Suspense>
    </>
  );
};

export default OrderDetails;

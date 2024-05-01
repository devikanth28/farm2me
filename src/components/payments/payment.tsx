import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import RouteConstant from "../../constants/route.constants";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ProductCheckoutProceedModel } from "../../models/products/product-checkout-proceed-model";
import { PaymentModel } from "../../models/payments/payment-model";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";
import { useAppSelector } from "../../redux/hooks";

const PaymentMode = lazy(() => import("./payment-mode"));
const ProductNotifyDialog = lazy(
  () => import("../products/product-notify-dialog")
);

const Payment = () => {
  var navigate = useNavigate();
  const { t } = useTranslation();
  const [paymentMode, setPaymentMode] = useState<PaymentModel>();
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const selectedPaymentMode = useAppSelector((state) => state.payments);

  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("payment_breadcrumb_label") }],
    home: { label: t("common_breadcrumb_home") },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg",
    title: t("payment_breadcrumb_label"),
  };

  const getOrderSummary = () => {
    if (loadPaymentOption()) {
      navigate(RouteConstant.orderSummary);
    } else {
      setNotifyHeader("Service Unavailable");
      setNotifyMessage(
        "Please select 'Cash on Delivery' as the payment mode. Other payment modes are still a work in progress."
      );
      setIsNotifyVisible(true);
    }
  };

  const loadPaymentMode = (value: any) => {
    setPaymentMode(value);
  };

  const loadPaymentOption = () => {
    const orderedData = ProductStorageHelpers.GetProcessedProductStorage();
    if (orderedData !== null) {
      let data: ProductCheckoutProceedModel = orderedData;
      if (paymentMode !== undefined) {
        data.paymentOption.id = paymentMode!.id.toString();
        data.paymentOption.mode = paymentMode!.mode;
        data.paymentOption.code = paymentMode!.code;
        data.paymentOption.status = paymentMode!.mode;
        data.paymentOption.description =
          paymentMode != null ? paymentMode.mode : "Cash on Delivery";
        data.paymentOption.dateTime = Date.now.toString();
      } else {
        data.paymentOption.id =
          selectedPaymentMode.selectedPayment!.id.toString();
        data.paymentOption.mode = selectedPaymentMode.selectedPayment!.mode;
        data.paymentOption.code = selectedPaymentMode.selectedPayment!.code;
        data.paymentOption.status = selectedPaymentMode.selectedPayment!.mode;
        data.paymentOption.description =
          selectedPaymentMode.selectedPayment!.mode != null
            ? selectedPaymentMode.selectedPayment!.mode
            : "Cash on Delivery";
        data.paymentOption.dateTime = Date.now.toString();
      }

      ProductStorageHelpers.SetProcessedProductStorage(data);
    }
    return true;
  };

  const hideNotifyDialog = () => {
    setIsNotifyVisible(false);
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <BreadCrumbCustom
          items={breadCrumbItems.items}
          home={breadCrumbItems.home}
          backgroundImage={breadCrumbItems.backgroundImage}
          title={breadCrumbItems.title}
        ></BreadCrumbCustom>
        <div className="Address-form-container layout-content mt-3 mb-3  grid">
          <div className="col-12 p-inputgroup">
            <span>
              <h5 className="mobile-txt-fnt mb-0">
                <Link to={RouteConstant.courierProviderList}>
                  <i className="pi pi-arrow-left"></i> Back to Courier Provider
                </Link>
              </h5>
            </span>
          </div>
          <div className="col-12 md:col-8 lg:col-8 ">
            <Card
              className="user-address-card border-1 surface-border"
              title={t("user_your_payment")}
            >
              <div className="payment-mode-card">
                <small className="p-warn">
                  2% payment Gateway charges will be included for all Non UPI
                  Payments.
                </small>
                <PaymentMode key="paymentmode" paymentmode={loadPaymentMode} />
              </div>
              <div className="p-inputgroup">
                {paymentMode?.mode !== "" ? (
                  <Button
                    label={t("payment_proceed")}
                    className="checkout-btn"
                    onClick={() => getOrderSummary()}
                    raised
                    icon="pi pi-credit-card"
                  />
                ) : null}
              </div>
            </Card>
          </div>

          <div className="md:col-4 flex bg-light-green justify-content-center  Auth-form-container img-none">
            <Image
              className="payment-image-right"
              src={process.env.PUBLIC_URL + "/assests/images/pay_mode.png"}
              alt="Image"
            />
          </div>
        </div>
        <ProductNotifyDialog
          messageHeader={notifyHeader}
          notifyMessage={notifyMessage}
          isVisible={isNotifyVisible}
          isHide={hideNotifyDialog}
        />
      </Suspense>
    </>
  );
};

export default Payment;

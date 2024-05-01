import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { ProductCheckoutProceedModel } from "../../models/products/product-checkout-proceed-model";
import AuthService from "../../services/autentication/auth.service";
import { UserAddress } from "../../models/user-address-model";
import Helpers from "../../utils/helpers";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";

const ItemDeleteDialog = lazy(() => import("./item-delete-dialog"));

const ItemsSummary = (props: any) => {
  var navigate = useNavigate();
  const { t } = useTranslation();
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);

  const footer = (
    <span>
      <Divider />
      <Button
        label={t("basket_proceed_to_checkout")}
        onClick={() => proceedToCheckOut()}
        className="checkout-btn font-bold"
        icon="pi pi-check-square"
        raised
      />
    </span>
  );

  const proceedToCheckOut = () => {
    setNotifyHeader("Checkout Item(s)");
    setNotifyMessage("Do you want to checkout the cart item(s)?");
    setIsNotifyVisible(true);
  };

  const hideNotifyDialog = (value: boolean) => {
    saveProductProcessedData();
    if (value) {
      if (AuthService.isUserLoggedIn()) {
        navigate(RouteConstant.userAddresses);
      } else {
        navigate(RouteConstant.login);
      }
    }
    setIsNotifyVisible(false);
  };

  const saveProductProcessedData = () => {
    var addressData: UserAddress = {
      userAddressID: 0,
      address1: "",
      address2: "",
      landmark: "",
      countryName: "",
      stateName: "",
      cityName: "",
      zipcode: "",
      gpsLocation: "",
      isPrimary: false,
      homeDeliveryAvailable: false,
    };

    var data: ProductCheckoutProceedModel = {
      id: generateUniqueId(),
      totalItemCost: props.total,
      totalTax: props.totalTax,
      deliveryHandlingCharges: props.total <= 700 ? 50 : 0,
      grandItemTotal:
        props.total <= 700
          ? props.total + 50 + props.totalTax
          : props.total + props.totalTax,
      items: props.orderItems,
      address: addressData,
      paymentOption: {
        id: generateUniqueId(),
        mode: "",
        code: "",
        status: "Not Done",
        description: "",
        dateTime: Date.now.toString(),
      },
      comment: "",
      courierProviderID: 0,
      courierCharges: 0,
      packingCharges: 0,
      handlingCharges: 0,
      paymentGatewayCharges: 0,
    };

    //setProcessedData(data);
    //localStorage.setItem("processed-items", JSON.stringify(data));
    ProductStorageHelpers.SetProcessedProductStorage(data);
  };

  const generateUniqueId = (): string => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000); // Adjust the range as needed
    return `${timestamp}-${random}`;
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <Card
          title={t("basket_basket_summary")}
          subTitle=""
          footer={footer}
          className="border-1 surface-border box-shadow-none item-summary-content"
        >
          <Divider className="mt-0" />
          <div>
            <div className="flex justify-content-between">
              <p
                className="text-lg font-semibold text-900 mb-1"
                style={{ lineHeight: "1.5" }}
              >
                {t("basket_total_items_cost")}
                <span> :</span>
              </p>
              <p className="text-lg font-semibold text-green">
                {Helpers.formatAmountInINR(props.total)}
              </p>
            </div>
            <div className="flex justify-content-between">
              <p
                className="text-lg font-semibold text-900 mb-1"
                style={{ lineHeight: "1.5" }}
              >
                {t("basket_tax")}
                <span>:</span>
              </p>
              <p className="text-lg font-semibold text-green">
                {Helpers.formatAmountInINR(props.totalTax)}
              </p>
            </div>
            <div className="flex justify-content-between">
              <p
                className="text-lg font-semibold text-900 mb-1"
                style={{ lineHeight: "1.5" }}
              >
                {t("basket_delivery_handling_charges")}
                <span>:</span>
              </p>
              <p className="text-lg font-semibold text-green">
                {Helpers.formatAmountInINR(props.total <= 700 ? 50 : 0)}
              </p>
            </div>
            <div className="flex justify-content-between">
              <p
                className="text-lg font-semibold text-900 mb-1"
                style={{ lineHeight: "1.5" }}
              >
                {t("basket_total")}
                <span> :</span>
              </p>
              <p className="text-lg font-semibold text-green">
                {Helpers.formatAmountInINR(
                  props.total <= 700
                    ? props.total + 50 + props.totalTax
                    : props.total + props.totalTax
                )}
              </p>
            </div>
          </div>
        </Card>

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

export default ItemsSummary;

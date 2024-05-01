import { useNavigate } from "react-router-dom";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { useTranslation } from "react-i18next";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import RouteConstant from "../../constants/route.constants";
import { Suspense, lazy, useEffect, useState } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";
import { Message } from "primereact/message";

const CourierProviderList = lazy(() => import("./courier-provider-list"));

const CourierProviderNew: React.FC = () => {
  const { t } = useTranslation();
  var navigate = useNavigate();
  const [isProceed, setIsProceed] = useState(false);

  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("courier_provider_breadcrumb_label") }],
    home: { label: t("common_breadcrumb_home") },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg",
    title: t("courier_provider_breadcrumb_label"),
  };

  const goToPaymentMode = () => {
    const serializedState = localStorage.getItem("courier-charges");
    if (serializedState === null) {
      localStorage.setItem("courier-charges", JSON.stringify(0));
    }
    navigate(RouteConstant.payment);
  };

  // useEffect(() => {
  //   loadProcessData();
  // });

  const loadProcessData = (isSetProcess: boolean) => {
    const data = ProductStorageHelpers.GetProductStorage();
    if (data !== undefined) {
      const isCourierNotAvailable = data.some(
        (item: any) => !item.courierAvailable
      );
      if (isCourierNotAvailable && !isSetProcess) {
        setIsProceed(false);
      } else if (isCourierNotAvailable && isSetProcess) {
        setIsProceed(true);
      }
    }
  };

  const footer = (
    <>
      <Button
        label={t("payment_proceed")}
        className="checkout-btn"
        icon="pi pi-truck"
        onClick={() => goToPaymentMode()}
        raised
        disabled={isProceed}
      />
    </>
  );

  const isProcessedShow = (isProcessData: boolean) => {
    loadProcessData(isProcessData);
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
                <Link to={RouteConstant.userAddresses}>
                  <i className="pi pi-arrow-left"></i> Back to User Address
                </Link>
              </h5>
            </span>
          </div>
          <div className="col-12 md:col-8 lg:col-8 ">
            <Card
              className="user-address-card border-1 surface-border"
              title={t("courier_provider_select")}
              footer={footer}
            >
              <div className="payment-mode-card">
                {isProceed ? (
                  <Message
                    severity="error"
                    text="Some products are not suitable for courier. Please remove from Basket."
                  />
                ) : null}
                <CourierProviderList isProcessed={isProcessedShow} />
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
      </Suspense>
    </>
  );
};

export default CourierProviderNew;

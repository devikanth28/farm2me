import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import RouteConstant from "../../constants/route.constants";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { useTranslation } from "react-i18next";

const OrderDetails = lazy(() => import("./order-details"));

const OrderSummary = () => {
  const { t } = useTranslation();
  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("ordersummary_Breadcrumb_label") }],
    home: { label: t("common_breadcrumb_home") },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/farmer2.png",
    title: t("ordersummary_Breadcrumb_label2"),
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
        <div className="Address-form-container layout-content mt-3 mb-3 grid order-summary-layout">
          <div className="col-12">
            <div className="p-inputgroup justify-content-start">
              <span>
                <h5 className="mb-0">
                  <Link to={RouteConstant.payment}>
                    <i className="pi pi-arrow-left font-bold"></i> Back to
                    Payment Mode
                  </Link>
                </h5>
              </span>
            </div>
            <Card className="b">
              <OrderDetails />
            </Card>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default OrderSummary;

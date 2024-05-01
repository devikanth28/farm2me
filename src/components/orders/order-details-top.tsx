import { useTranslation } from "react-i18next";
import Helpers from "../../utils/helpers";

const OrderDetailsTop = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid order-top-color mb-3 px-3">
        <div className="col-12 md:col-6">
          <b>{t("ordersummary_order_summery")}</b>
        </div>
        <div className="col-12 md:col-6 text-right left-mobile">
          <p className="mb-1 font-semibold">
            {t("ordersummary_order_date")} : {new Date().toDateString()}
          </p>
          <p className="mb-1 font-semibold">
            Estimated Delivery Date (On or before):{" "}
            {Helpers.getNext7Days().toString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTop;

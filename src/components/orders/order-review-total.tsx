import Helpers from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const OrderReviewTotal = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex align-items-left justify-content-end px-3">
        <div className="col col-6">
          <label>Comments: </label>
          <label>{props.orderedItems.comment}</label>
        </div>
        <div className="col col-1"></div>
        <div className="col-6  md:col-6 lg:col-3">
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {t("ordersummary_total_items_cost")} :
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {t("ordersummary_tax")} :
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            Handling Charges :
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            Courier Charges :
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            Packing Charges :
          </p>
          <p
            className="m-1 font-semibold  text-green font-bold"
            style={{ lineHeight: "1.5" }}
          >
            {t("ordersummary_total")} :
          </p>
        </div>
        <div className="col-6 md:col-6 lg:col-2 text-right">
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {Helpers.formatAmountInINR(props.orderedItems.taxableAmount)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {Helpers.formatAmountInINR(props.orderedItems.taxAmount)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {props.orderedItems.taxableAmount <= 700
              ? Helpers.formatAmountInINR(50)
              : Helpers.formatAmountInINR(0)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {Helpers.formatAmountInINR(props.orderedItems.courierCharges)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {Helpers.formatAmountInINR(props.orderedItems.packingCharges)}
          </p>
          <p
            className="m-1 font-semibold  text-green font-bold"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.orderedItems.grossAmount)}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderReviewTotal;

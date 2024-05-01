import { useTranslation } from "react-i18next";

const OrderReviewTop = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid order-top-color mb-3 px-3">
        <div className="col-12 md:col-6">
          <b>Order #: {props.orderData.orderID}</b>
        </div>
        <div className="col-12 md:col-6 text-right left-mobile">
          <p className="mb-1 font-semibold">
            {t("ordersummary_order_date")} :{" "}
            {new Date(props.orderData.createdDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p className="mb-1 font-semibold">
            Estimated Delivery Date (On or before):{" "}
            {new Date(
              props.orderData.orderDetail[0].expectedDeliveryDate
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderReviewTop;

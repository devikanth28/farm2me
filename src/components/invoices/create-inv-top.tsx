import { useTranslation } from "react-i18next";

const CreateInvoiceTop = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="grid order-top-color mb-3 px-3">
        <div className="col-12 md:col-4">
          <b>Order #: {props.orderData.orderID}</b>
        </div>
        <div className="col-12 md:col-4">
          <b>Status: {props.orderData.orderStatusName}</b>
        </div>
        <div className="col-12 md:col-4 text-right left-mobile">
          <p className="mb-1 font-semibold">
            {t("ordersummary_order_date")} :{" "}
            {new Date(props.orderData.createdDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>          
        </div>
      </div>
    </>
  );
};

export default CreateInvoiceTop;

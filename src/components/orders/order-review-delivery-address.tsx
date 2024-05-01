import { useTranslation } from "react-i18next";

const OrderReviewDeliveryAddress = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="text-900small">
        <p className="font-bold">{t("ordersummary_delivery_address")}</p>
        <p className="mb-0">{props.addressDetails.address1},</p>
        <p className="mb-0">{props.addressDetails.address2},</p>
        <p className="mb-0">{props.addressDetails.landmark},</p>
        <p className="mb-0">
          {props.addressDetails.cityName},{props.addressDetails.stateName},
          {props.addressDetails.countryName}-{props.addressDetails.zipcode}.
        </p>
        <br />
        <p className="font-bold">
          {t("ordersummary_payment_mode")} :{" "}
          {props.addressDetails.paymentModeName}
        </p>
      </div>
    </>
  );
};

export default OrderReviewDeliveryAddress;

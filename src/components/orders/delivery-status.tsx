import { useTranslation } from "react-i18next";

const DeliveryStatus = () => {
  const { t } = useTranslation();
  return (
    <>
      <h6 className="font-bold">{t("delivery_status")}</h6>
      <h6> Order not Confirmed.</h6>
    </>
  );
};

export default DeliveryStatus;

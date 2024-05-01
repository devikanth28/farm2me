import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UserAddress } from "../../models/user-address-model";

const DeliveryAddress = (props: any) => {
  const { t } = useTranslation();
  const [userAddress, setUserAddress] = useState<UserAddress>(
    props.addressDetails
  );

  useEffect(() => {
    setUserAddress(props.addressDetails);
  }, [props.addressDetails]);
  return (
    <>
      <h6 className="font-bold">{t("ordersummary_delivery_address")}</h6>
      {userAddress !== undefined ? (
        <p>
          {" "}
          <p className="mb-0">{userAddress.address1},</p>
          <p className="mb-0">{userAddress.address2},</p>
          <p className="mb-0">{userAddress.landmark},</p>
          <p className="mb-0">
            {userAddress.cityName},{userAddress.stateName},
            {userAddress.countryName}-{userAddress.zipcode}.
          </p>
        </p>
      ) : null}
      <h6 className="font-bold">
        {t("ordersummary_payment_mode")} : {props.paymentMode.mode}
      </h6>
    </>
  );
};

export default DeliveryAddress;

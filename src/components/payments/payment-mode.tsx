import { RadioButton } from "primereact/radiobutton";
import { Image } from "primereact/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectedPayment } from "../../redux/slices/payments";

const PaymentMode = ({ paymentmode }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const selectedUserAddress = useAppSelector((state) => state.userAddress);
  const selectedPaymentMode = useAppSelector((state) => state.payments);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(0);
  const isAdmin = useAppSelector((state) => state.isAdmin);
  let paymentmodesdata;

  if (
    selectedUserAddress.selecedUserAddresses?.homeDeliveryAvailable &&
    !isAdmin
  ) {
    paymentmodesdata = [
      {
        id: "1",
        mode: t("payment_mode1"),
        code: "COD",
        modeImage: process.env.PUBLIC_URL + "/assests/images/cod.jpg",
        isSelected: true,
      },
      {
        id: "2",
        mode: "Credit Card",
        code: "OPTCRDC",
        modeImage: process.env.PUBLIC_URL + "/assests/images/credit-card.png",
        isSelected: false,
      },
      {
        id: "3",
        mode: "Debit Card",
        code: "OPTDBCRD",
        modeImage: process.env.PUBLIC_URL + "/assests/images/credit-card.png",
        isSelected: false,
      },
      {
        id: "4",
        mode: "Internet Banking",
        code: "OPTNBK",
        modeImage: process.env.PUBLIC_URL + "/assests/images/ib.jpg",
        isSelected: false,
      },
      {
        id: "5",
        mode: "UPI",
        code: "OPTUPI",
        modeImage: process.env.PUBLIC_URL + "/assests/images/oup.jpg",
        isSelected: false,
      },
    ];
  } else if (isAdmin) {
    paymentmodesdata = [
      {
        id: "1",
        mode: t("payment_mode1"),
        code: "COD",
        modeImage: process.env.PUBLIC_URL + "/assests/images/cod.jpg",
        isSelected: true,
      },
      {
        id: "6",
        mode: "Payment Link",
        code: "",
        modeImage: process.env.PUBLIC_URL + "/assests/images/Betaallink.png",
        isSelected: true,
      },
    ];
  } else {
    paymentmodesdata = [
      {
        id: "2",
        mode: "Credit Card",
        code: "OPTCRDC",
        modeImage: process.env.PUBLIC_URL + "/assests/images/credit-card.png",
        isSelected: false,
      },
      {
        id: "3",
        mode: "Debit Card",
        code: "OPTDBCRD",
        modeImage: process.env.PUBLIC_URL + "/assests/images/credit-card.png",
        isSelected: false,
      },
      {
        id: "4",
        mode: "Internet Banking",
        code: "OPTNBK",
        modeImage: process.env.PUBLIC_URL + "/assests/images/ib.jpg",
        isSelected: false,
      },
      {
        id: "5",
        mode: "UPI",
        code: "OPTUPI",
        modeImage: process.env.PUBLIC_URL + "/assests/images/oup.jpg",
        isSelected: false,
      },
    ];
  }

  useEffect(() => {
    if (selectedPaymentMode.selectedPayment === null) {
      setSelectedPaymentId(0);
    } else {
      setSelectedPaymentId(selectedPaymentMode.selectedPayment.id);
    }
  });

  /// this part will removable after API.
  const savePaymentMode = (e: any, value: any) => {
    paymentmode(value);
    setSelectedPaymentId(value.id);
    dispatch(selectedPayment(value));
  };

  return (
    <>
      {paymentmodesdata.map((category) => {
        return (
          <div key={category.id} className="payment-card">
            <div key={category.id} className="flex flex-column gap-3">
              <div key={category.id} className="flex align-items-left">
                <div className="col-8 md:col-9 ">
                  <RadioButton
                    inputId={category.id}
                    name="category"
                    value={category}
                    onChange={(e) => savePaymentMode(e, e.value)}
                    checked={selectedPaymentId.toString() === category.id}
                  />
                  <label htmlFor={category.id} className="ml-2 font-medium">
                    {category.mode}
                  </label>
                </div>
                {/* <div className="col col-7"></div> */}
                <div className="col-4 md:col-3 text-right">
                  <div className="payment-mode-image">
                    <Image
                      src={category.modeImage}
                      alt={category.modeImage}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PaymentMode;

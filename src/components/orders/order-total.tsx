import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useTranslation } from "react-i18next";
import Helpers from "../../utils/helpers";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { comment } from "../../redux/slices/comments";

const OrderTotal = (props: any) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState("");
  const dispatch = useAppDispatch();  

  const handleCommentChange = (e: any) => {
    setComments(e);
    dispatch(comment(e));
  };  

  const calculateFinalTotal = () => {    
      return (
        props.grandItemTotal + props.courierCharges + props.packingCharges + props.paymentGatewayCharges
      );
  };  

  return (
    <>
      <div className="flex align-items-left justify-content-end px-3">
        <div className="col col-6">
          <InputTextarea
            placeholder="Comment (if any)"
            rows={7}
            cols={80}
            value={comments}
            onChange={(e) => handleCommentChange(e.target.value)}
            maxLength={1000}
          />
          <p className="text-small">
            Characters remaining: {1000 - comments.length}
          </p>
        </div>
        <div className="col col-1"></div>
        <div className="col-6  md:col-6 lg:col-3">
          <p
            className="m-1 font-semibold text-900 "
            style={{ lineHeight: "1.5" }}
          >
            {t("ordersummary_total_items_cost")} :
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {t("ordersummary_tax")} :
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {t("ordersummary_delivery_handling_charges")} :
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            Courier Charges :
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            Packing Charges :
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            Payment Getway Charges :
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {t("ordersummary_total")} :
          </p>
          <Divider />
          <Button
            label="Edit Order"
            severity="warning"
            onClick={props.updateItem}
            icon="pi pi-file-edit"
            style={{ color: "white" }}
            raised
          />
        </div>
        <div className="col-6 md:col-6 lg:col-2 text-right">
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.totalItemCost)}
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.totalTax)}
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.deliveryHandlingCharges)}
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.courierCharges)}
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.packingCharges)}
          </p>
          <p
            className="m-1 font-semibold text-900"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(props.paymentGatewayCharges)}
          </p>
          <p
            className="m-1 font-semibold  text-green font-bold"
            style={{ lineHeight: "1.5" }}
          >
            {Helpers.formatAmountInINR(calculateFinalTotal())}
          </p>
          <Divider />
          <Button
            label="Confirm Order"
            className="checkout-btn"
            onClick={props.confirmOrder}
            icon="pi pi-shopping-bag"
            raised
          />
        </div>
      </div>
    </>
  );
};

export default OrderTotal;

import Helpers from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const CreateInvoiceTotal = (props: any) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex align-items-left justify-content-end px-3">
        <div className="col col-6">
          <label style={{color:'green'}}>{t("generateInv_shipping_add")}: </label>
          <p>{props.orderedItems.address1}  {props.orderedItems.address2} {props.orderedItems.landmark}<br/>
          {props.orderedItems.cityName} {props.orderedItems.stateName} Pin: {props.orderedItems.zipcode}</p>
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
            {t("ordersummary_delivery_handling_charges")} :
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {t("couriercharge__Breadcrumb_label")} :
          </p>
          <p className="m-1 font-semibold  text-green font-bold" style={{ lineHeight: "1.5" }}>
            {t("ordersummary_total")} :
          </p>
        </div>
        <div className="col-6 md:col-6 lg:col-2 text-right">
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {Helpers.formatAmountInINR(props.taxableAmount)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            {Helpers.formatAmountInINR(props.taxAmount)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>            
            { props.orderedItems.orderInvoice.length>0 ? Helpers.formatAmountInINR(0) : Helpers.formatAmountInINR(props.orderedItems.handlingCharges)}
          </p>
          <p className="m-1" style={{ lineHeight: "1.5" }}>
            { props.orderedItems.orderInvoice.length>0 ? Helpers.formatAmountInINR(0) : Helpers.formatAmountInINR(props.orderedItems.courierCharges)}
          </p>
          <p className="m-1 font-semibold  text-green font-bold" style={{ lineHeight: "1.5" }}>
            { props.orderedItems.orderInvoice.length>0 ? Helpers.formatAmountInINR(props.taxableAmount + props.taxAmount )
            : Helpers.formatAmountInINR(props.taxableAmount + props.taxAmount + props.orderedItems.handlingCharges + props.orderedItems.courierCharges)}
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateInvoiceTotal;

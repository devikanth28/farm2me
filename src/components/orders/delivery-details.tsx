import DeliveryAddress from "./delivery-address";
import DeliveryStatus from "./delivery-status";
import { Divider } from "primereact/divider";

const DeliveryDetails = (props: any) => {
  return (
    <>
      <div className="grid px-3">
        <div className="col-12 md:col-6 lg:col-7">
          <DeliveryAddress
            addressDetails={props.address}
            paymentMode={props.paymentOption}
          />
        </div>
        {/* <div className="col-12 md:col-3 lg:col-3"></div> */}
        {/* <div className="col-12 md:col-6 lg:col-4 text-right">
          <DeliveryStatus />
        </div> */}
      </div>
    </>
  );
};

export default DeliveryDetails;

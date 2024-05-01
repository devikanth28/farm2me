import OrderReviewDeliveryAddress from "./order-review-delivery-address";
import OrderReviewDeliveryStatus from "./order-review-delivery-status";

const OrderReviewDeliveryDetails = (props: any) => {
  return (
    <>
      <div className="grid px-3">
        <div className="col-12 md:col-6 lg:col-8">
          <OrderReviewDeliveryAddress addressDetails={props.deliveryDetails} />
        </div>

        <div className="col-12 md:col-6 lg:col-4 text-right">
          <OrderReviewDeliveryStatus
            orderStatus={props.deliveryDetails.orderHistory}
          />
        </div>
      </div>
    </>
  );
};

export default OrderReviewDeliveryDetails;

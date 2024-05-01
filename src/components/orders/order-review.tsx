import { ScrollPanel } from "primereact/scrollpanel";
import OrderReviewTop from "./order-review-top";
import OrderReviewDeliveryDetails from "./order-review-delivery-details";
import OrderReviewItems from "./order-review-items";
import OrderReviewTotal from "./order-review-total";
import OrderReviewInvoiceDetails from "./order-review-invoice-details";

const OrderReview = (props: any) => {
  return (
    <>
      <div className="flex flex-column border-1 surface-border box-shadow-none m-0">
        <ScrollPanel style={{ width: "100%", height: "400px" }}>
          <OrderReviewTop orderData={props.OrderData} />
          <OrderReviewDeliveryDetails deliveryDetails={props.OrderData} />
          <OrderReviewItems orderedItems={props.OrderData} />
          <OrderReviewTotal orderedItems={props.OrderData} />
          <OrderReviewInvoiceDetails
            orderInvoice={props.OrderData.orderInvoice}
          />
        </ScrollPanel>
      </div>
    </>
  );
};

export default OrderReview;

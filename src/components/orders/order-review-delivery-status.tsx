import { Timeline } from "primereact/timeline";

const OrderReviewDeliveryStatus = (props: any) => {
  const customizedMarker = () => {
    return (
      <span
        className="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
        style={{ backgroundColor: "#9C27B0" }}
      >
        <i className="pi pi-shopping-cart"></i>
      </span>
    );
  };

  return (
    <>
      <Timeline
        value={props.orderStatus}
        content={(item) => (
          <div className="flex flex-column align-items-center lg:align-items-start gap-3">
            <div className="flex flex-column gap-1">
              <div className="font-bold">{item.orderStatusName}</div>
              <small className="text-700">
                {new Date(item.createdDate).toLocaleDateString("en-gb", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </small>
            </div>
          </div>
        )}
        layout="horizontal"
        marker={customizedMarker}
      />
    </>
  );
};

export default OrderReviewDeliveryStatus;

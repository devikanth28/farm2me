import { useNavigate, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import RouteConstant from "../../constants/route.constants";

const MainPaymentGetwayResponse = () => {
  var navigate = useNavigate();
  
  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get('orderId');
  const trackingId = queryParams.get('trackingId');
  const status = queryParams.get('status');
  const message = queryParams.get('message');

  const onClickHome = () => {
    navigate(RouteConstant.products);
  };
  const header = (
    <img
      alt="Card"
      src={process.env.PUBLIC_URL + "/assests/images/Paymentsuccessful21.png"}
    />
  );
  const footer = (
    <>
      <Button label="Home" icon="pi pi-home" onClick={onClickHome} />
    </>
  );
  return (
    <>
      <div className="Address-form-container layout-content mt-3 mb-3  grid">
        <div className="col-12 p-inputgroup">
          <span>
            <h3>Payment Status: {status == "1" ? "Success" : "Error Occured"} </h3>
          </span>
        </div>
        <div className="col-12 md:col-12 lg:col-12 ">
          <div className="card flex justify-content-center">
            <Card footer={footer} header={status == "1" ? header : ""} className="md:w-25rem">
              <p className="p-2">{message}</p>
              <p className="p-2">Your Order Id : {orderId}</p>
              <p className="p-2">Your Tracking Id : {trackingId}</p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPaymentGetwayResponse;

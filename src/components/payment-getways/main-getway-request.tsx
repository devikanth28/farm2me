import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { useAppSelector } from "../../redux/hooks";
import PaymentIframe from "./payment-iframe";

const MainGetwayRequest = () => {
  const selectedGetwayLink = useAppSelector((state) => state.getwayLink);

  return (
    <>
      <div className="Address-form-container layout-content mt-3 mb-3  grid">
        <div className="col-12 p-inputgroup">
          <span></span>
        </div>
        <div className="col-12 md:col-12 lg:col-12">
          <Card className="user-address-card border-1 surface-border">
            {selectedGetwayLink!.selectedGetway !== null ? (
              <PaymentIframe
                iframeURL={selectedGetwayLink!.selectedGetway!.paymentURL}
              />
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
};

export default MainGetwayRequest;

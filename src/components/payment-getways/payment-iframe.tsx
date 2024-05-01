import { useEffect, useState } from "react";

const PaymentIframe = (props: any) => {
  const [paymentFrameHeight, setPaymentFrameHeight] = useState<number | null>(
    null
  );
  useEffect(() => {
    const paymentFrame = document.getElementById(
      "paymentFrame"
    ) as HTMLIFrameElement;

    const messageListener = (e: MessageEvent) => {
      if (e.data && e.data["newHeight"]) {
        setPaymentFrameHeight(e.data["newHeight"]);
      }
    };

    if (paymentFrame) {
      paymentFrame.addEventListener("load", () => {
        window.addEventListener("message", messageListener, false);
      });
    }

    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  useEffect(() => {
    const paymentFrame = document.getElementById(
      "paymentFrame"
    ) as HTMLIFrameElement;

    if (paymentFrame && paymentFrameHeight !== null) {
      paymentFrame.style.height = `${paymentFrameHeight}px`;
    }
    console.log(props);
  }, [paymentFrameHeight]);

  return (
    <>
      <iframe
        width="675"
        height="830"
        id="paymentFrame"
        src={props.iframeURL}
        title="Payment Frame"
      ></iframe>
    </>
  );
};

export default PaymentIframe;

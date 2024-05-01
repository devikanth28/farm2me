import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Panel } from "primereact/panel";
import { useEffect, useState } from "react";
import { ProductCheckoutProceedModel } from "../../models/products/product-checkout-proceed-model";
import Helpers from "../../utils/helpers";

const OrderConfirmDialog = ({
  showConfirmDialog,
  hideConfirmDialog,
  orderDetails,
  orderId,
  showGetwayPage,
}: any) => {
  const header = (
    <>
      <span style={{ fontSize: "1rem" }}>Order Successfully Placed!</span>{" "}
      {/* LT */}
    </>
  );
  const [orderData, setOrderData] =
    useState<ProductCheckoutProceedModel>(orderDetails);

  useEffect(() => {
    setOrderData(orderDetails);
  }, [orderDetails]);
  const footer = (
    <div
      className="flex flex-wrap justify-content-end gap-2"
      style={{ padding: "0.7rem" }}
    >
      {orderData.paymentOption.mode === "Cash On Delivery" ||
      orderData.paymentOption.mode === "Payment Link" ? (
        <Button
          label="Close"
          icon="pi pi-times"
          className="p-button-secondary"
          onClick={hideConfirmDialog}
          severity="danger"
        />
      ) : (
        <Button
          label="Prceed To Payment"
          icon="pi pi-paypal"
          className="p-button-secondary"
          onClick={showGetwayPage}
          severity="success"
        />
      )}
      {/* <Button
        label="Download"
        icon="pi pi-file-pdf"
        className="p-button-outlined p-button-secondary"
        onClick={hideConfirmDialog}
        severity="help"
      /> */}
    </div>
  );

  return (
    <>
      <Dialog
        visible={showConfirmDialog}
        header={header}
        className="custom-dialog checkout-prod"
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        modal
        onHide={hideConfirmDialog}
        footer={footer}
      >
        <span className="font-bold text-green2" style={{ paddingLeft: "1rem" }}>
          Order #: {orderId}
        </span>
        <br />
        <span className="font-bold text-green2" style={{ paddingLeft: "1rem" }}>
          Order Date & Time: {new Date().toDateString()}
        </span>
        <br />
        <span className="font-bold text-green2" style={{ padding: "1rem" }}>
          Estimated Delivery Date (On or before):{" "}
          {Helpers.getNext7Days().toString()}
        </span>
        <Splitter>
          <SplitterPanel className="flex">
            <Panel header="Shipping Address" style={{ width: "20rem" }}>
              {orderData.address ? (
                <div className="flex flex-column align-items-left">
                  <div>
                    <label htmlFor="name">{orderData.address.address1}</label>
                  </div>
                  <div>
                    <label htmlFor="name">{orderData.address.address2},</label>
                  </div>
                  <div>
                    <label htmlFor="name">{orderData.address.landmark},</label>
                  </div>
                  <div>
                    <label htmlFor="name">
                      {orderData.address.cityName},{orderData.address.stateName}
                      ,{orderData.address.countryName},-
                      {orderData.address.zipcode}.
                    </label>
                  </div>
                </div>
              ) : null}
            </Panel>
          </SplitterPanel>
          <SplitterPanel className="flex">
            <Panel header="Payment Method" style={{ width: "20rem" }}>
              {orderData.paymentOption ? (
                <div className="flex flex-column align-items-left">
                  <div>
                    <label htmlFor="name">
                      Mode : {orderData.paymentOption.mode}.
                    </label>
                  </div>
                  <div>
                    <label htmlFor="name">Status : Order Placed.</label>
                  </div>
                </div>
              ) : null}
            </Panel>
          </SplitterPanel>
        </Splitter>
        <Panel header="Order Summary" toggleable>
          <div className="flex flex-column align-items-left">
            <div>
              <label htmlFor="name">
                Total Products : {/* LT */}
                <span className="text-green2">{orderData.items.length}</span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Taxable Value : {/* LT */}
                <span className="text-green2">
                  {Helpers.formatAmountInINR(orderData.totalItemCost)}
                </span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Total Tax : {/* LT */}
                <span className="text-green2">
                  {Helpers.formatAmountInINR(orderData.totalTax)}
                </span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Delivery/Handling charge : {/* LT */}
                <span className="text-green2">
                  {Helpers.formatAmountInINR(orderData.deliveryHandlingCharges)}
                </span>
                <br />
                <span className="text-small">
                  ( ₹50.00 will be added if the bill amount is less than or
                  equal to ₹700.00 )
                </span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Courier Charges : {/* LT */}
                <span className="text-green2">
                  {Helpers.formatAmountInINR(orderData.courierCharges)}
                </span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Packing charge : {/* LT */}
                <span className="text-green2">
                  {Helpers.formatAmountInINR(orderData.packingCharges)}
                </span>
                <br />
                <span className="text-small">
                  ( ₹100.00 will be added if the bill amount is less than or
                  equal to ₹2500.00 )
                </span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                Payment Gateway Charges : {/* LT */}
                <span className="text-green2">
                  {Helpers.formatAmountInINR(orderData.paymentGatewayCharges)}
                </span>
              </label>
            </div>
            <div>
              <label htmlFor="name">
                To be Paid :
                <span className="text-green2">
                  {Helpers.formatAmountInINR(
                    orderData.grandItemTotal + orderData.courierCharges + orderData.packingCharges + orderData.paymentGatewayCharges
                  )}
                </span>
              </label>
            </div>
          </div>
        </Panel>
      </Dialog>
    </>
  );
};

export default OrderConfirmDialog;

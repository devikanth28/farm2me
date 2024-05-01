import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProductCheckoutModel } from "../../models/products/product-checkout-model";
import {
  calculateItemSum,
  calculateItemTotal,
  calculateTotalTax,
} from "./product-calculation";
import Helpers from "../../utils/helpers";
import { itemCount } from "../../redux/slices/counter";

const ProductsCheckoutDialog = ({
  productData,
  showCheckoutDialog,
  hideCheckoutDialog,
  proceedToCheckout,
}: any) => {
  const [productDialog, setProductDialog] =
    useState<ProductCheckoutModel>(productData);
  var navigate = useNavigate();
  const [deliveryCharge] = useState(0);

  useEffect(() => {
    setProductDialog(productData);
  }, [productData]);

  const header = (
    <>
      <span style={{ fontSize: "1rem" }}>
        Product successfully added to your shopping cart
      </span>{" "}
      {/* LT */}
    </>
  );

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        label="Continue Shopping"
        icon="pi pi-times"
        className="p-button-outlined p-button-secondary"
        onClick={hideCheckoutDialog}
        raised
      />
      <Button
        label="Proceed to Checkout"
        icon="pi pi-check"
        onClick={() => navigate(RouteConstant.basket)}
        raised
      />
    </div>
  );

  return (
    <>
      <Dialog
        visible={showCheckoutDialog}
        header={header}
        footer={footer}
        className="custom-dialog checkout-prod"
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        modal
        onHide={hideCheckoutDialog}
      >
        <div className="sm-view">
          {productDialog.media && (
            <img
              src={
                productDialog.media !== undefined ||
                productDialog.media[0] !== undefined
                  ? productDialog.media[0].url
                  : process.env.PUBLIC_URL +
                    "/assests/images/Desiri-Groundnut-Oils.png"
              }
              alt={productDialog.name}
              className="product-image block m-auto pb-3"
              style={{ width: "9rem" }}
            />
          )}
          <div className="flex flex-column align-items-center gap-1">
            <div className="text-2xl text-900 font-bold">
              {productDialog.name}
            </div>
            <span className="price text-2xl font-semibold">
              {Helpers.formatAmountInINR(productDialog.unitPrice)}
            </span>
            <span className="text-1xl font-bold">
              Weight : {productDialog.weight}
            </span>
          </div>
        </div>
        <div className="flex flex-column align-items-left gap-1 btm-section">
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Total Quantity : {/* LT */}
              <span className="text-green2">{productDialog.quantity}</span>
            </label>
          </div>
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Total items cost : {/* LT */}
              <span className="text-green2">
                {Helpers.formatAmountInINR(
                  calculateItemSum(
                    productDialog.unitPrice !== undefined
                      ? productDialog.unitPrice
                      : 0,
                    productDialog.quantity
                  )
                )}
              </span>
            </label>
          </div>
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Total Tax : {/* LT */}
              <span className="text-green2">
                {Helpers.formatAmountInINR(
                  calculateTotalTax(
                    productDialog.unitPrice !== undefined
                      ? productDialog.unitPrice
                      : 0,
                    productDialog.quantity,
                    productDialog.tax
                  )
                )}
              </span>
            </label>
          </div>
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Delivery/Handling charge : {/* LT */}
              <span className="text-green2">
                {Helpers.formatAmountInINR(
                  calculateItemSum(
                    productDialog.unitPrice !== undefined
                      ? productDialog.unitPrice
                      : 0,
                    productDialog.quantity
                  ) <= 700
                    ? 50
                    : 0
                )}
              </span>
              <br />
              <span className="text-small">
                ( ₹50.00 will be added if the bill amount is less than or equal
                to ₹700.00 )
              </span>
            </label>
          </div>
          <div className="field">
            <label htmlFor="name" className="font-bold">
              Total :
              <span className="text-green2">
                {Helpers.formatAmountInINR(
                  calculateItemTotal(
                    productDialog.unitPrice !== undefined
                      ? productDialog.unitPrice
                      : 0,
                    productDialog.quantity,
                    calculateTotalTax(
                      productDialog.unitPrice !== undefined
                        ? productDialog.unitPrice
                        : 0,
                      productDialog.quantity,
                      productDialog.tax
                    ),
                    deliveryCharge
                  )
                )}
              </span>
            </label>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductsCheckoutDialog;

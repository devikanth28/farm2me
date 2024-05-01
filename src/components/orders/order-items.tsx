import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductCheckoutModel } from "../../models/products/product-checkout-model";
import {
  calculateItemSum,
  calculateItemTotal,
  calculateTotalTax,
} from "../products/product-calculation";
import Helpers from "../../utils/helpers";
import { Tag } from "primereact/tag";

const OrderItems = (cartItemDetails: any) => {
  const [value18, setValue18] = useState(0);
  const [cartItems, setCartItems] = useState<ProductCheckoutModel[]>(
    cartItemDetails.cartItemDetails
  );
  const { t } = useTranslation();

  const getItemQuantitySum = (num1: number, num2: number) => {
    return num1 * num2;
  };

  return (
    <>
      <div className="grid grid-row m-0 border-y-1 border-gray-300 mx-3  align-items-center justify-content-between order-item-list">
        <div className="col-12 md:col-4 text-left left-mobile">
          <h6 className="mb-0">Item Name</h6>
        </div>
        <div className="col-3 md:col-2 text-left left-mobile">
          <h6 className="mb-0">
            Unit Price (<i className="fa fa-inr"></i>)
          </h6>
        </div>
        <div className="col-5 md:col-2 text-left left-mobile">
          <h6 className="mb-0">Quantity</h6>
        </div>
        <div className="col-3 md:col-2 text-left left-mobile">
          <h6 className="mb-0">
            Taxable Value (<i className="fa fa-inr"></i>)
          </h6>
        </div>
        <div className="col-3 md:col-1 text-left left-mobile">
          <h6 className="mb-0">
            Tax (<i className="fa fa-inr"></i>)
          </h6>
        </div>
        <div className="col-3 md:col-1 text-left left-mobile">
          <h6 className="mb-0">
            Total (<i className="fa fa-inr"></i>)
          </h6>
        </div>
      </div>
      {cartItems &&
        cartItems.map((item) => {
          return (
            <>
              <div className="grid grid-row m-0 border-y-1 border-gray-300 mx-3  align-items-center justify-content-between order-item-list">
                <div className="col-12 md:col-4 text-left left-mobile">
                  <div className="flex align-items-center">
                    <div className="image-container ">
                      <img
                        src={
                          item.media[0] !== undefined
                            ? item.media[0].url
                            : process.env.PUBLIC_URL +
                              "/assests/images/Desiri-Groundnut-Oils.png"
                        }
                        alt="no-name"
                        width={100}
                        className="order-items-img mr-3"
                      />
                    </div>
                    <div className="product-list-detail">
                      {item.inStock === 0 ? (
                        <Tag
                          icon="pi pi-truck"
                          severity="danger"
                          value="Courier-Unavailable"
                        ></Tag>
                      ) : null}
                      <h6 className="mb-2 mobile-head">{item.name}</h6>
                      <i className="pi pi-tag product-category-icon mr-2"></i>
                      {item.categoryName} - {item.subCategoryName}
                    </div>
                  </div>
                </div>
                <div className="col-3 md:col-2 text-left left-mobile">
                  <h6 className="mb-0">
                    {Helpers.formatAmountInINR(item.unitPrice)}
                  </h6>
                </div>
                <div className="col-5 md:col-2 text-left left-mobile">
                  <h6 className="product-quantity mb-0">{item.quantity}</h6>
                </div>
                <div className="col-3 md:col-2 text-left left-mobile">
                  <h6 className="mb-0">
                    {Helpers.formatAmountInINR(
                      getItemQuantitySum(
                        item.unitPrice || 0,
                        value18 === 0 ? item.quantity : value18
                      )
                    )}{" "}
                  </h6>
                </div>
                <div className="col-3 md:col-1 text-left left-mobile">
                  <h6 className="mb-0">
                    {Helpers.formatAmountInINR(
                      calculateTotalTax(
                        item.unitPrice !== undefined ? item.unitPrice : 0,
                        item.quantity,
                        item.tax
                      )
                    )}
                  </h6>
                </div>
                <div className="col-3 md:col-1 text-left left-mobile">
                  <h6 className="mb-0">
                    {Helpers.formatAmountInINR(
                      calculateItemTotal(
                        item.unitPrice !== undefined ? item.unitPrice : 0,
                        item.quantity,
                        calculateTotalTax(
                          item.unitPrice !== undefined ? item.unitPrice : 0,
                          item.quantity,
                          item.tax
                        ),
                        0
                      )
                    )}
                  </h6>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default OrderItems;

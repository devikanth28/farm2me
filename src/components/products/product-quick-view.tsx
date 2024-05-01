import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputNumber } from "primereact/inputnumber";
import { Galleria } from "primereact/galleria";
import { QuickViewResponsiveOptions } from "./quick-view-responsive";
import { useTranslation } from "react-i18next";
import { ProductNewModel } from "../../models/products/product-new-model";
import Helpers from "../../utils/helpers";

const ProductQuickView = ({
  productData,
  showQuickViewDialog,
  addToCartDialog,
  hideQuickViewDialog,
  buyNowDialog,
  minQuantity,
}: any) => {
  const { t } = useTranslation();

  const [images, setImages] = useState<any>(null);
  const [productDialog, setProductDialog] =
    useState<ProductNewModel>(productData);
  const [quantity, setQuantity] = useState(0);
  const [fixedQuantity, setFixedQuantity] = useState(0);

  useEffect(() => {
    setProductDialog(productData);
    setQuantity(minQuantity);
    setImages(mapProductImageData(productData.media));
  }, [productData]);

  const itemTemplate = (item: any) => {
    return <Image src={item.itemImageSrc} alt={item.alt} preview />;
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ width: "100%", maxHeight: "60px" }}
      />
    );
  };

  const mapProductImageData = (images: any) => {
    if (images && images.length > 0) {
      return images.map((image: any) => {
        return {
          itemImageSrc: image.url,
          thumbnailImageSrc: image.url,
          alt: "",
          title: "",
        };
      });
    }
    return [];
  };

  const calculateTotal = () => {
    return productDialog.unitPrice === undefined
      ? 0
      : productDialog.unitPrice * quantity;
  };

  const updatePerQuantity = (event: any) => {
    if (
      event.target.dataset.pcSection === "incrementiconprops" ||
      event.target.dataset.pcSection === "incrementbutton"
    ) {
      if (productDialog) {
        setQuantity(quantity + productDialog.orderMultiples);
      }
    }

    if (
      event.target.dataset.pcSection === "decrementiconprops" ||
      event.target.dataset.pcSection === "decrementbutton"
    ) {
      if (productDialog && quantity !== fixedQuantity) {
        setQuantity(quantity - productDialog.orderMultiples);
      }
    }
  };

  return (
    <>
      <Dialog
        visible={showQuickViewDialog}
        className="quickview cust-dialog "
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        modal
        onHide={hideQuickViewDialog}
      >
        <div className="grid">
          <div className="col-12 sm:col-12 md:col-6">
            <Galleria
              value={images}
              responsiveOptions={QuickViewResponsiveOptions}
              numVisible={3}
              className="img-wrapper"
              item={itemTemplate}
              thumbnail={thumbnailTemplate}
            />
          </div>
          <div className="col-12 sm:col-12 md:col-6">
            <div className="h-full flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
              <div className="h-full content flex flex-column align-items-center lg:align-items-start gap-3">
                <div className="flex flex-column gap-1">
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="font-semibold">
                      {productDialog.categoryName}
                    </span>
                    {!productDialog.courierAvailable ? (
                      <Button
                        icon="pi pi-truck"
                        rounded
                        severity="danger"
                        tooltip="Courier Unavailable"
                      />
                    ) : null}
                  </span>
                  <p className="text-4xl text-900">{productDialog.name}</p>
                  <p className="price text-3xl font-semibold">
                    {Helpers.formatAmountInINR(productDialog.totalUnitPrice)}
                  </p>
                  <div className="text-700">{productDialog.description}</div>
                </div>
                <div className="flex flex-column gap-1"></div>
                <div className="flex flex-column gap-1">
                  <div className="product-list-quantity">
                    <label htmlFor="{String(productDialog.id)}">Quantity</label>
                    {/*LT*/}
                    <InputNumber
                      inputId={String(productDialog.id)}
                      value={quantity}
                      showButtons
                      buttonLayout="horizontal"
                      step={productDialog.orderMultiples}
                      onClick={(e) => updatePerQuantity(e)}
                      decrementButtonClassName="p-button-danger"
                      incrementButtonClassName="p-button-success"
                      incrementButtonIcon="pi pi-plus"
                      decrementButtonIcon="pi pi-minus"
                      min={productDialog.minOrderQty}
                      disabled={productDialog?.inStock === 0}
                    />
                  </div>

                  <div className="product-list-quantity">
                    <label>Total </label>
                    {/*LT*/}
                    <span>{Helpers.formatAmountInINR(calculateTotal())}</span>
                  </div>
                </div>

                <div className="flex flex-column gap-2 w-12 action-controls">
                  <Button
                    icon="pi pi-shopping-cart"
                    className="btn-green"
                    label={t("products_addtocart_button")}
                    onClick={() => addToCartDialog(quantity)}
                    raised
                    disabled={productDialog?.inStock === 0}
                  ></Button>
                  <Button
                    icon="pi pi-shopping-bag"
                    severity="warning"
                    className="btn-orange"
                    label="Buy Now"
                    onClick={() => buyNowDialog(quantity)}
                    raised
                    disabled={productDialog?.inStock === 0}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProductQuickView;

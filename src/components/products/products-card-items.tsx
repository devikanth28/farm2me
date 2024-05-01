import { useEffect, useState } from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ProductNewModel } from "../../models/products/product-new-model";
import { Tag } from "primereact/tag";
import { ProductSeverity } from "./product-severity";
import { ProductSeverityText } from "./product-severity-text";
import Helpers from "../../utils/helpers";

const ProductCardItems = ({
  productData,
  showProductQuickView,
  buyNowItemDialog,
}: any) => {
  const { t } = useTranslation();
  const [productDialog, setProductDialog] =
    useState<ProductNewModel>(productData);
  var navigate = useNavigate();
  const icon = <i className="pi pi-search"></i>;
  const tooltipOptions = { position: "top" };

  useEffect(() => {
    setProductDialog(productData);
  }, [productData]);

  return (
    <>
      {productDialog !== undefined || productDialog !== null ? (
        <div className="p-1 border-1 surface-border surface-card">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              {!productDialog.courierAvailable ? (
                <Button
                  icon="pi pi-truck"
                  rounded
                  severity="danger"
                  style={{ fontSize: "20px", width: "26px", height: "26px" }}
                  tooltip="Courier Unavailable"
                />
              ) : null}
            </div>
            <Tag
              value={ProductSeverityText(productDialog.inStock)}
              severity={ProductSeverity(productDialog.inStock)}
            ></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-1 prod-item">
            <div className="img-wrap">
              <Image
                src={
                  productDialog.media[0] !== undefined
                    ? productDialog.media[0].url
                    : process.env.PUBLIC_URL +
                      "/assests/images/Desiri-Groundnut-Oils.png"
                }
                alt={productDialog?.name}
                indicatorIcon={icon}
                width="170"
                preview
              />
            </div>
            <p className="pro-title">{productDialog?.name}</p>

            <span className="text-1xl font-bold">
              {Helpers.formatAmountInINR(productDialog?.totalUnitPrice)}
            </span>
          </div>
          <div className="grid">
            <div className="col-2"></div>
            <div className="col-3">
              <Button
                icon="pi pi-search"
                className="m-1"
                onClick={() => showProductQuickView(productDialog)}
                tooltip={t("products_quickview_button")}
                raised
                rounded
                severity="warning"
              />
            </div>

            <div className="col-3">
              <Button
                icon="pi pi-shopping-cart"
                className="m-1"
                disabled={productDialog?.inStock === 0}
                onClick={() =>
                  buyNowItemDialog(productDialog, productDialog.minOrderQty)
                }
                tooltip={t("products_addtocart_button")}
                raised
                rounded
                severity="info"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductCardItems;

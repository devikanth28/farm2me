import { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { ProductsModel } from "../../models/products-model";
import ProductQuickView from "./product-quick-view";
import { ProductSeverity } from "./product-severity";
import { useTranslation } from "react-i18next";
// import ProductsCheckoutDialog from './products-checkout-dialog';

export const GridItems = (product: ProductsModel) => {
  const { t } = useTranslation();

  const [showQuickViewDialog, setShowQuickViewDialog] = useState(false);
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);
  const [cartData, setCartData] = useState<ProductsModel[]>([]);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isQuickFilled, setIsQuickFilled] = useState(false);
  const [isCartFilled, setIsCartFilled] = useState(false);

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const showCheckout = (product: ProductsModel) => {
    setShowCheckoutDialog(true);
  };

  const hideCheckoutDialog = () => {
    setShowCheckoutDialog(false);
  };

  const showQuickView = (product: ProductsModel) => {
    setShowQuickViewDialog(true);
  };

  const hideQuickViewDialog = () => {
    setShowQuickViewDialog(false);
  };

  const addToProductCart = (product: ProductsModel) => {
    setIsCartFilled(!isCartFilled);
    setShowQuickViewDialog(true);
  };

  const addProductCart = () => {
    setShowQuickViewDialog(false);
    setShowCheckoutDialog(true);
  };

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  return (
    <>
      <div className="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i
                className={
                  isHeartFilled
                    ? "pi pi-heart-fill mr-2 filledHeart"
                    : "pi pi-heart mr-2"
                }
                onClick={toggleHeart}
              />
            </div>
            <Tag value="INSTOCK" severity="info"></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={
                product.media.length > 0
                  ? product.media[0]
                  : "../assests/images/Desiri-Groundnut-Oils.png"
              }
              alt={product.name}
              height="230rem"
            />
            <div className="text-1xl font-bold">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
            <span className="text-1xl font-bold">
              <i className="fa fa-inr"></i>
              {product.unitPrice}
            </span>
          </div>
          <div className="flex align-items-center gap-2">
            <Button
              label={t("products_quickview_button")}
              style={{ fontSize: "0.7rem" }}
              icon="pi pi-search"
              size="small"
              onClick={() => showQuickView(product)}
            />
            <Button
              label={t("products_addtocart_button")}
              style={{ fontSize: "0.7rem" }}
              icon="pi pi-shopping-cart"
              size="small"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
              onClick={() => addToProductCart(product)}
            ></Button>
          </div>
        </div>
      </div>

      <ProductQuickView
        productData={product}
        showQuickViewDialog={showQuickViewDialog}
        hideQuickViewDialog={hideQuickViewDialog}
      />
    </>
  );
};

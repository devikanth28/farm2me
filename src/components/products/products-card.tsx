import { useEffect, useState, Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { ProductCheckoutModel } from "../../models/products/product-checkout-model";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { ProductNewModel } from "../../models/products/product-new-model";
import { useAppDispatch } from "../../redux/hooks";
import { itemCount } from "../../redux/slices/counter";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";

const ProductCardItems = lazy(() => import("./products-card-items"));
const ProductQuickView = lazy(() => import("./product-quick-view"));
const ProductsCheckoutDialog = lazy(() => import("./products-checkout-dialog"));
const ProductNotifyDialog = lazy(() => import("./product-notify-dialog"));

const ProductsCard = ({ productsData }: any) => {
  var navigate = useNavigate();
  const [isProductQuickView, setIsProductQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] =
    useState<ProductNewModel>(productsData);
  const [isProductCheckoutView, setIsProductCheckoutView] = useState(false);
  const [productCheckoutToLocal, setProductCheckoutToLocal] = useState<
    ProductCheckoutModel[]
  >(JSON.parse(localStorage.getItem("checkout-items") || "[]"));
  const [productCheckout, setProductCheckout] =
    useState<ProductCheckoutModel>();

  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);

  const dispatch = useAppDispatch();

  const showProductQuickView = (product: ProductNewModel) => {
    setQuickViewProduct(product);
    setIsProductQuickView(true);
  };

  const addToCartDialog = (quantity: number) => {
    saveDataInLocalStorage(quantity);
    setIsProductQuickView(false);
    setIsProductCheckoutView(true);
  };

  const hideProductQuickView = () => {
    setIsProductQuickView(false);
  };

  const hideProductCheckoutView = () => {
    setIsProductCheckoutView(false);
  };

  const buyNowDialog = (quantity: number) => {
    saveDataInLocalStorage(quantity);
    navigate(RouteConstant.basket);
  };

  const buyNowItemDialog = (product: ProductNewModel, quantity: number) => {
    saveDataInLocalStorageData(quantity, product);
    navigate(RouteConstant.basket);
  };

  const saveDataInLocalStorage = (quantity: number) => {
    if (!isDuplicateProduct(quickViewProduct.id)) {
      const storeData = [
        ...productCheckoutToLocal,
        {
          ...productCheckoutToLocal,
          ...mapToCheckoutProduct(quickViewProduct, quantity),
        },
      ];
      setProductCheckout(mapToCheckoutProduct(quickViewProduct, quantity));
      setProductCheckoutToLocal(storeData);
      //localStorage.setItem("checkout-items", JSON.stringify(storeData));
      ProductStorageHelpers.SetProductStorage(storeData);
    } else {
      setNotifyHeader("Duplicate");
      setNotifyMessage(
        "This product is already in your shopping cart. Please choose another item or continue shopping."
      );

      setIsNotifyVisible(true);
    }
    dispatch(itemCount(productCheckoutToLocal.length + 1));
  };

  const saveDataInLocalStorageData = (
    quantity: number,
    product: ProductNewModel
  ) => {
    if (!isDuplicateProduct(product.id)) {
      const storeData = [
        ...productCheckoutToLocal,
        {
          ...productCheckoutToLocal,
          ...mapToCheckoutProduct(product, quantity),
        },
      ];
      setProductCheckout(mapToCheckoutProduct(product, quantity));
      setProductCheckoutToLocal(storeData);
      //ocalStorage.setItem("checkout-items", JSON.stringify(storeData));
      ProductStorageHelpers.SetProductStorage(storeData);
    }
    dispatch(itemCount(productCheckoutToLocal.length + 1));
  };

  const isDuplicateProduct = (id: number): boolean => {
    return productCheckoutToLocal.some((product) => product.id === id);
  };

  const mapToCheckoutProduct = (
    input: ProductNewModel,
    quantity: number
  ): ProductCheckoutModel => {
    return {
      id: input.id,
      name: input.name,
      description: input.description,
      unitPrice: input.unitPrice,
      tax: input.tax,
      weight: input.weight,
      minOrderQty: input.minOrderQty,
      orderMultiples: input.orderMultiples,
      media: input.media,
      categoryID: input.categoryID,
      categoryName: input.categoryName,
      subCategoryID: input.subCategoryID,
      subCategoryName: input.subCategoryName,
      quantity: quantity,
      courierAvailable: input.courierAvailable,
      inStock: input.inStock,
      minQuantity: input.minOrderQty,
    };
  };

  const loadDataFromLocalStorage = () => {
    // if (localStorage.getItem("checkout-items")) {
    //   const localData = localStorage.getItem("checkout-items");
    //   const parsedData = JSON.parse(localData !== null ? localData : "");
    //   setProductCheckoutToLocal(parsedData);
    // }
    const data = ProductStorageHelpers.GetProductStorage();
    if (data !== undefined) {
      setProductCheckoutToLocal(data);
      dispatch(itemCount(data.length));
    } else {
      dispatch(itemCount(0));
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, [productsData]);

  const hideNotifyDialog = () => {
    setIsNotifyVisible(false);
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <div className="grid">
          {productsData.map((product: ProductNewModel, index: number) => {
            return (
              <div className="col-12 sm:col-6 md:col-3 lg:col-2" key={index}>
                <ProductCardItems
                  productData={product}
                  showProductQuickView={showProductQuickView}
                  buyNowItemDialog={buyNowItemDialog}
                />
              </div>
            );
          })}
        </div>

        {quickViewProduct ? (
          <ProductQuickView
            productData={quickViewProduct}
            showQuickViewDialog={isProductQuickView}
            addToCartDialog={addToCartDialog}
            hideQuickViewDialog={hideProductQuickView}
            buyNowDialog={buyNowDialog}
            minQuantity={quickViewProduct.minOrderQty}
          />
        ) : null}
        {productCheckout ? (
          <ProductsCheckoutDialog
            productData={productCheckout}
            showCheckoutDialog={isProductCheckoutView}
            hideCheckoutDialog={hideProductCheckoutView}
          />
        ) : null}

        <ProductNotifyDialog
          messageHeader={notifyHeader}
          notifyMessage={notifyMessage}
          isVisible={isNotifyVisible}
          isHide={hideNotifyDialog}
        />
      </Suspense>
    </>
  );
};

export default ProductsCard;

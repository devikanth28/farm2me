import { ProductCheckoutModel } from "../models/products/product-checkout-model";
import AuthService from "../services/autentication/auth.service";
import { ProductCheckoutProceedModel } from "../models/products/product-checkout-proceed-model";

const SetProductStorage = (localData: ProductCheckoutModel[]) => {
  const userId = GetUserId();
  const data = {
    userId: userId,
    checkOutItems: localData,
  };

  localStorage.setItem(
    "checkout-items" + userId.toString(),
    JSON.stringify(data)
  );
};

const GetProductStorage = () => {
  if (
    AuthService.isUserLoggedIn() &&
    localStorage.getItem("checkout-items0000")
  ) {
    SetProductStorage(UpdateUserId());
  }
  const userId = GetUserId();
  if (localStorage.getItem("checkout-items" + userId)) {
    const localData = localStorage.getItem("checkout-items" + userId);
    const parsedData = JSON.parse(localData !== null ? localData : "");
    return parsedData.checkOutItems;
  }
};

const UpdateUserId = () => {
  const localData = localStorage.getItem("checkout-items0000");
  const parsedData = JSON.parse(localData !== null ? localData : "");
  localStorage.removeItem("checkout-items0000");
  return parsedData.checkOutItems;
};

const GetUserId = () => {
  if (AuthService.isUserLoggedIn()) {
    const localData = localStorage.getItem("user");
    const parsedData = JSON.parse(localData !== null ? localData : "");
    return parsedData.userID;
  } else {
    return "0000";
  }
};

const GetUserRoleId = () => {
  if (AuthService.isUserLoggedIn()) {
    const localData = localStorage.getItem("user");
    const parsedData = JSON.parse(localData !== null ? localData : "");
    return parsedData.roleID;
  } else {
    return "0000";
  }
};

const SetProcessedProductStorage = (
  processData: ProductCheckoutProceedModel
) => {
  const userId = GetUserId();
  const data = {
    userId: userId,
    processOrder: processData,
  };
  localStorage.setItem("processed-items" + userId, JSON.stringify(data));
};

const GetProcessedProductStorage = () => {
  const userId = GetUserId();
  if (localStorage.getItem("processed-items" + userId)) {
    const localData = localStorage.getItem("processed-items" + userId);
    const parsedData = JSON.parse(localData !== null ? localData : "");
    return parsedData.processOrder;
  }
};

const IsAdminUser = (): boolean => {
  const userRoleId = GetUserRoleId();
  if (userRoleId === 2) {
    return true;
  } else {
    return false;
  }
};

const ClearAllLocalStorage = () => {
  const userId = GetUserId();
  localStorage.removeItem("processed-items" + userId);
  localStorage.removeItem("checkout-items" + userId);
  localStorage.removeItem("courier-provider" + userId);
  localStorage.removeItem("courier-charges" + userId);
  localStorage.removeItem("total-weight" + userId);
};

const ProductStorageHelpers = {
  SetProductStorage,
  GetProductStorage,
  SetProcessedProductStorage,
  GetProcessedProductStorage,
  ClearAllLocalStorage,
  IsAdminUser,
  GetUserId,
};

export default ProductStorageHelpers;

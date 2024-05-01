import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import UserDropDownSelect from "./user-dropdown-select";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";
import { isAdmin } from "../../redux/slices/is-admin";

const CartItems = lazy(() => import("./cart-tems"));

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const count = useAppSelector((state) => state.counter);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);

  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("basket_breadcrumb_label") }],
    home: { label: "Home > Shop" },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/farmer.png",
    title: t("basket_breadcrumb_label"),
  };

  useEffect(() => {
    const isAdminData = ProductStorageHelpers.IsAdminUser();
    setIsAdminUser(isAdminData);
    dispatch(isAdmin(isAdminData));
  }, [isAdminUser]);

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <BreadCrumbCustom
          items={breadCrumbItems.items}
          home={breadCrumbItems.home}
          backgroundImage={breadCrumbItems.backgroundImage}
          title={breadCrumbItems.title}
        ></BreadCrumbCustom>
        <div className="flex-auto Address-form-container layout-content mt-3 mb-3">
          <div className="flex align-items-center mb-3 grid">
            <div className="col-12 md:col-4 lg:col-4 ">
              <h4 className="mobile-txt-fnt ml-3 m-0">
                {t("basket_you_have")}{" "}
                <span className="text-green font-bold">{count}</span>{" "}
                {t("basket_items_in_your_cart")}
              </h4>
            </div>
            {isAdminUser ? (
              <div className="col-12 md:col-4 lg:col-4">
                <UserDropDownSelect />
              </div>
            ) : null}
          </div>

          <CartItems></CartItems>
        </div>
      </Suspense>
    </>
  );
};

export default Cart;

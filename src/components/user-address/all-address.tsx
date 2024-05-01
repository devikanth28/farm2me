import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import RouteConstant from "../../constants/route.constants";
import AddressLists from "./address-lists";
import UserAddressService from "../../services/useraddress/useraddress.service";
import { UserAddress } from "../../models/user-address-model";
import { useTranslation } from "react-i18next";

const AllUserAddress = () => {
  const [addressList, setAddressList] = useState<UserAddress[]>([]);

  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const footerContent = (
    <div className="button-container ">
      <Button
        label="Cancle"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="border-1 bg-white text-900"
      />
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        className=" bg-red-500 w-4"
      />
    </div>
  );
  const getAddreses = () => {
    UserAddressService.getUserAddress().then((data: any) => {
      let result: any = [];
      data.forEach((req: any) => {
        if (!req.isDeleted) {
          result.push(req);
        }
      });
      setAddressList(result);
    });
  };

  useEffect(() => {
    getAddreses();
  }, []);

  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("useraddress_breadcrumb_label") }],
    home: { label: t("common_breadcrumb_home") },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg",
    title: t("useraddress_breadcrumb_label"),
  };

  return (
    <>
      <BreadCrumbCustom
        items={breadCrumbItems.items}
        home={breadCrumbItems.home}
        backgroundImage={breadCrumbItems.backgroundImage}
        title={breadCrumbItems.title}
      ></BreadCrumbCustom>
      <div className="Address-form-container layout-content mt-3 mb-3 grid">
        <div className="col-12 p-inputgroup justify-content-start">
          <h5 className="mobile-txt-fnt mb-0">
            <Link to={RouteConstant.basket} className="history-title">
              <i className="pi pi-arrow-left"></i> Back to Cart Items
            </Link>
          </h5>
        </div>

        <div className="col-12 md:col-8 lg:col-8">
          <AddressLists
            id="addresslists"
            key="addresslists"
            address={addressList}
          />
        </div>
        <div className="col-4 flex bg-light-green justify-content-center ">
          <Image
            width="150"
            src={process.env.PUBLIC_URL + "/assests/images/homelogo.png"}
            alt="Image"
            className="align-self-center align-items-center"
          />
        </div>
      </div>
    </>
  );
};

export default AllUserAddress;

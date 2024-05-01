import { useState, useEffect, useCallback } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { UserAddress } from "../../models/user-address-model";
import AddressSelector from "./address-selector";
import { useTranslation } from "react-i18next";
import UserAddressService from "../../services/useraddress/useraddress.service";
import { ProductCheckoutProceedModel } from "../../models/products/product-checkout-proceed-model";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUserAddress } from "../../redux/slices/user-address";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";

const AddressLists = (props: any) => {
  const [addressList, setAddressList] = useState<UserAddress[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const { t } = useTranslation();
  var navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isUseThisAddress, setIsUseThisAddress] = useState(false);

  const isAdmin = useAppSelector((state) => state.isAdmin);
  const selectedAdminUserId = useAppSelector((state) => state.adminUser);

  const getAddreses = useCallback((addressId?: number) => {
    if (isAdmin) {
      UserAddressService.getUserAddressById(
        selectedAdminUserId.selectedAdminUserId
      ).then((response: any) => {
        if (response !== null) {
          let result: any = [];
          response.forEach((req: any) => {
            if (!req.isDeleted) {
              result.push(req);
            }
          });
          setSelectedId(addressId || result[result.length - 1]?.userAddressID);
          setAddressList(result);
        }
      });
    } else {
      UserAddressService.getUserAddress().then((response: any) => {
        if (response !== null) {
          let result: any = [];
          response.forEach((req: any) => {
            if (!req.isDeleted) {
              result.push(req);
            }
          });
          setSelectedId(addressId || result[result.length - 1]?.userAddressID);
          setAddressList(result);
        }
      });
    }
  }, []);

  useEffect(() => {
    getAddreses();
    const orderedData = ProductStorageHelpers.GetProcessedProductStorage();
    if (orderedData !== null) {
      setIsUseThisAddress(true);
    } else {
      setIsUseThisAddress(false);
    }
  }, []);

  const getPaymentMode = () => {
    const filterData = addressList.filter(
      (item) => item.userAddressID === selectedId
    );
    setSelectedUserAddress(filterData[0]);
    loadPaymentOption(filterData[0]);
    navigate(RouteConstant.courierProviderList);
  };

  const setSelectedUserAddress = (data: UserAddress) => {
    dispatch(selectUserAddress(data));
  };

  const loadPaymentOption = (filterData: UserAddress) => {
    const orderedData = ProductStorageHelpers.GetProcessedProductStorage();
    if (orderedData !== null) {
      let data: ProductCheckoutProceedModel = orderedData;
      data.address.userAddressID = filterData.userAddressID;
      data.address.createdBy = filterData.createdBy;
      data.address.userName = filterData.userName;
      data.address.address1 = filterData.address1;
      data.address.address2 = filterData.address2;
      data.address.landmark = filterData.landmark;
      data.address.countryName = filterData.countryName;
      data.address.stateName = filterData.stateName;
      data.address.cityName = filterData.cityName;
      data.address.zipcode = filterData.zipcode;
      data.address.gpsLocation = filterData.gpsLocation;
      data.address.isPrimary = filterData.isPrimary;
      data.address.homeDeliveryAvailable = filterData.homeDeliveryAvailable;
      ProductStorageHelpers.SetProcessedProductStorage(data);
    }
  };

  return (
    <>
      <Card
        title={t("useraddress_your_addresses")}
        className="user-address-card border-1 surface-border h-full"
      >
        {addressList?.length === 0 && (
          <div className="flex align-items-center line-height-3  p-3 text-lg border-round box-info">
            <i className="pi pi-info-circle text-md mr-2"></i>
            No addresses found. Please click on below link to add a new address.
          </div>
        )}
        {addressList?.length > 0 &&
          addressList
            ?.sort((a, b) => (a.userAddressID < b.userAddressID ? 1 : -1))
            .map((item) => {
              return (
                <AddressSelector
                  id={item.userAddressID}
                  name={item.userName}
                  key={item.userAddressID + ""}
                  addressLine1={item.address1}
                  addressLine2={item.address2}
                  landmark={item.landmark}
                  country={item.countryName}
                  state={item.stateName}
                  city={item.cityName}
                  selectedId={selectedId}
                  pincode={item.zipcode}
                  getAddreses={getAddreses}
                />
              );
            })}

        <div className="justify-content-start mt-4">
          <div
            className="add-address-link"
            onClick={() => navigate(RouteConstant.addAddress + 0)}
          >
            <i className="fa-solid fa-plus"></i>
            <span className="text-blue-500 font-semibold">
              {" "}
              {t("useraddress_add_a_new_address")}{" "}
            </span>
          </div>
        </div>
        {addressList?.length > 0 && isUseThisAddress ? (
          <div className="p-inputgroup justify-content-start">
            <Button
              label={t("useraddress_use_this_address")}
              className="checkout-btn"
              onClick={() => getPaymentMode()}
              raised
              icon="pi pi-envelope"
            />
          </div>
        ) : null}
      </Card>
    </>
  );
};

export default AddressLists;

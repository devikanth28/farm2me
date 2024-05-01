import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import RouteConstant from "../../constants/route.constants";
import { useTranslation } from "react-i18next";
import { UserAddress } from "../../models/user-address-model";
import UserAddressService from "../../services/useraddress/useraddress.service";

const AddressSelector = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [deletableAddressId, setDeletableAddressId] = useState<number>(0);
  const [address, setAddress] = useState<UserAddress>();
  const { t } = useTranslation();
  var navigate = useNavigate();

  const footerContent = (
    <div className="button-container ">
      <Button
        label="Cancle"
        onClick={() => setVisible(false)}
        className="border-1 bg-white text-900"
      />
      <Button
        label="Ok"
        onClick={() => deleteAddressFromData()}
        className=" bg-red-600 w-2"
      />
    </div>
  );

  const editAddress = (addressId: number) => {
    navigate(RouteConstant.addAddress + addressId);
  };

  const deleteAddress = (addressId: number) => {
    setDeletableAddressId(addressId);
    setVisible(true);
  };

  const deleteAddressFromData = async () => {
    await UserAddressService.deleteUserAddress(deletableAddressId);
    props.getAddreses();
    setVisible(false);
  };

  return (
    <>
      <div className="address-box">
        <div className="flex">
          <RadioButton
            inputId={props.id}
            name={props.name}
            value={props.id}
            onChange={(e) => props.getAddreses(e.value)}
            checked={props.selectedId === props.id}
            className="mt-1"
          />
          <label className="ml-2">
            <p className="mb-0">
              <b>{props.addressLine1}</b> {props.addressLine2} {props.landmark}{" "}
              {props.city} {props.state} Pin-{props.pincode}
            </p>
            <span
              className="edit-address"
              onClick={(e: any) => {
                editAddress(props.id);
              }}
            >
              {t("editaddress_edit_address")}
            </span>{" "}
            |
            <span
              className="delete-address"
              onClick={(e: any) => {
                deleteAddress(props.id);
              }}
            >
              {t("useraddress_delete_address")}
            </span>
          </label>
        </div>
      </div>

      <Dialog
        header="Delete Address"
        visible={visible}
        style={{ width: "45vw" }}
        onHide={() => setVisible(false)}
        footer={footerContent}
        className="dialog-delete-add"
      >
        <p className="m-0">{t("useraddress_delete_confirmmessage")}</p>
      </Dialog>
    </>
  );
};

export default AddressSelector;

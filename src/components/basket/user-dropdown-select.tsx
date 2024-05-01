import {
  Dropdown,
  DropdownChangeEvent,
  DropdownFilterEvent,
} from "primereact/dropdown";
import orderServices from "../../services/orders/orderservice";
import { userOption, userResult } from "../../models/orders/order-list-model";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectedAdminUserId,
  setAdminUsers,
} from "../../redux/slices/admin-user";
import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";

const UserDropDownSelect = () => {
  const [selectedUser, setSelectedUser] = useState<any>();
  const dispatch = useAppDispatch();
  const blankUserDetail: userOption[] = [
    { userID: 0, name: "No Data Found", primaryContactNbr: "" },
  ];
  const [orderUsers, setOrderUsers] = useState<userOption[]>(blankUserDetail);
  const [orderUser, setOrderUser] = useState<userResult[]>([]);

  const adminUsersData = useAppSelector(
    (state) => state.adminUser.getAdminUsers
  );
  const adminUsersId = useAppSelector(
    (state) => state.adminUser.selectedAdminUserId
  );

  const handleDropdownFilter = (e: DropdownFilterEvent) => {
    if (e.filter.length > 2) {
      orderServices.getOrderUsers(e.filter).then((response: userOption[]) => {
        if (response.length > 0) {
          setOrderUsers(response);
          dispatch(setAdminUsers(response));
        }
      });
    }
  };

  const handleDropdownChange = (e: DropdownChangeEvent) => {
    setSelectedUser(e.value);
    if (e.value !== undefined) {
      dispatch(selectedAdminUserId(e.value));
    } else {
      dispatch(selectedAdminUserId(ProductStorageHelpers.GetUserId()));
    }
  };

  useEffect(() => {
    if (adminUsersId !== 0) {
      setOrderUser(
        adminUsersData.map((user) => ({
          userID: user.userID,
          detail: `${user.name}, ${user.primaryContactNbr}`,
        }))
      );
      setSelectedUser(adminUsersId);
    } else {
      if (orderUsers !== undefined) {
        setOrderUser(
          orderUsers.map((user) => ({
            userID: user.userID,
            detail: `${user.name}, ${user.primaryContactNbr}`,
          }))
        );
      }
    }
  }, [orderUsers]);

  return (
    <>
      <Dropdown
        inputId="dd-user-select"
        options={orderUser}
        optionLabel="detail"
        optionValue="userID"
        value={selectedUser}
        onChange={(e) => handleDropdownChange(e)}
        onFilter={handleDropdownFilter}
        filter
        showClear
        placeholder="Select User/Mobile"
        className="w-full md:w-23rem"
      />
    </>
  );
};

export default UserDropDownSelect;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAddress } from "../../../models/user-address-model";

interface UserAddressState {
  userAddresses: UserAddress[];
  selecedUserAddresses: UserAddress | null;
}

const initialState: UserAddressState = {
  userAddresses: [],
  selecedUserAddresses: null,
};

export const userAddressSlice = createSlice({
  name: "userAddress",
  initialState,
  reducers: {
    setUserAddresses: (state, action: PayloadAction<UserAddress[]>) => {
      state.userAddresses = action.payload;
    },
    selectUserAddress: (state, action: PayloadAction<UserAddress | null>) => {
      state.selecedUserAddresses = action.payload;
    },
  },
});

export const { setUserAddresses, selectUserAddress } = userAddressSlice.actions;
export default userAddressSlice.reducer;

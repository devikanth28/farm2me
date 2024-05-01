import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userOption } from "../../../models/orders/order-list-model";

interface AdminUserState {
  getAdminUsers: userOption[];
  selectedAdminUserId: number | 0;
}

const initialState: AdminUserState = {
  getAdminUsers: [],
  selectedAdminUserId: 0,
};
export const adminUserSlice = createSlice({
  initialState,
  name: "adminuser",
  reducers: {
    setAdminUsers: (state, action: PayloadAction<userOption[]>) => {
      state.getAdminUsers = action.payload;
    },
    selectedAdminUserId: (state, action: PayloadAction<number>) => {
      state.selectedAdminUserId = action.payload;
    },
  },
});

export const { setAdminUsers, selectedAdminUserId } = adminUserSlice.actions;
export default adminUserSlice.reducer;

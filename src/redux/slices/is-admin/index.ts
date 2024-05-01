import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const isAdminSlice = createSlice({
  initialState: false,
  name: "isadmin",
  reducers: {
    isAdmin: (state, action: PayloadAction<boolean>) => action.payload,
  },
});

export const { isAdmin } = isAdminSlice.actions;
export default isAdminSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  initialState: 0,
  name: "counter",
  reducers: {
    itemCount: (state, action) => action.payload,
  },
});

export const { itemCount } = counterSlice.actions;
export default counterSlice.reducer;

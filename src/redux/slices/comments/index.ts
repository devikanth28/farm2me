import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  initialState: "",
  name: "comment",
  reducers: {
    comment: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { comment } = commentSlice.actions;
export default commentSlice.reducer;

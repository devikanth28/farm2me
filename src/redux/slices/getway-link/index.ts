import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetWayLinkModel } from "../../../models/getway-link/getway-link-model";

interface GetwayState {
  getwayLinks: GetWayLinkModel[];
  selectedGetway: GetWayLinkModel | null;
}

const initialState: GetwayState = {
  getwayLinks: [],
  selectedGetway: null,
};

export const getwayLinkSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setGetwayLinks: (state, action: PayloadAction<GetWayLinkModel[]>) => {
      state.getwayLinks = action.payload;
    },
    selectedGetway: (state, action: PayloadAction<GetWayLinkModel | null>) => {
      state.selectedGetway = action.payload;
    },
  },
});

export const { setGetwayLinks, selectedGetway } = getwayLinkSlice.actions;
export default getwayLinkSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourierProviderNewModel } from "../../../models/courier-provider/courier-provider-new-model";

interface CourierProviderState {
  data: CourierProviderNewModel[];
  loading: boolean;
  error: string | null;
  selectedCourierProvider: CourierProviderNewModel | null;
}

const initialState: CourierProviderState = {
  data: [],
  loading: false,
  error: null,
  selectedCourierProvider: null,
};

const courierProviderSlice = createSlice({
  name: "courier",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<CourierProviderNewModel[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectUserAddress: (
      state,
      action: PayloadAction<CourierProviderNewModel | null>
    ) => {
      state.selectedCourierProvider = action.payload;
    },
  },
});

export const {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
  selectUserAddress,
} = courierProviderSlice.actions;
export default courierProviderSlice.reducer;

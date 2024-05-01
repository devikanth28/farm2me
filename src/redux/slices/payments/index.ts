import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentModel } from "../../../models/payments/payment-model";

interface PaymentsState {
  userPayments: PaymentModel[];
  selectedPayment: PaymentModel | null;
}

const initialState: PaymentsState = {
  userPayments: [],
  selectedPayment: null,
};

export const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<PaymentModel[]>) => {
      state.userPayments = action.payload;
    },
    selectedPayment: (state, action: PayloadAction<PaymentModel | null>) => {
      state.selectedPayment = action.payload;
    },
  },
});

export const { setPayments, selectedPayment } = paymentsSlice.actions;
export default paymentsSlice.reducer;

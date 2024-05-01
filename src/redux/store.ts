import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import commentSlice from "./slices/comments";
import userAddressSlice from "./slices/user-address";
import courierProviderSlice from "./slices/courier-provider";
import paymentsSlice from "./slices/payments";
import getwayLink from "./slices/getway-link";
import adminUser from "./slices/admin-user";
import isAdmin from "./slices/is-admin";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    comment: commentSlice,
    userAddress: userAddressSlice,
    courierProviders: courierProviderSlice,
    payments: paymentsSlice,
    getwayLink: getwayLink,
    adminUser: adminUser,
    isAdmin: isAdmin,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

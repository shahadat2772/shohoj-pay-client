import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./features/transAction/transactionSlice";
import userAllEmailData from "./features/userAllEmailInfoSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
  },
});
export default store;

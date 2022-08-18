import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./features/transAction/transactionSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
  },
});
export default store;

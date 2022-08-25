import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./features/transAction/transactionSlice";
import userAllEmailData from "./features/userAllEmailInfoSlice";
import allServiceData from "./features/getAllServiceSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    getAllService: allServiceData,
  },
});
export default store;

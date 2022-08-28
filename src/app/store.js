import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./slices/transactionSlice";
import userAllEmailData from "./slices/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
  },
});
export default store;

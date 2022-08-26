import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./features/transAction/transactionSlice";
import userAllEmailData from "./features/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
  },
});
export default store;

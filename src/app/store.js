import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./features/transAction/transactionSlice";
import userAllEmailData from "./features/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";
import allServiceData from "./features/getAllServiceSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
    getAllService: allServiceData,
    allNotification: notificationReducer,
  },
});
export default store;

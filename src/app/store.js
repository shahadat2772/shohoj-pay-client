import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./slices/transactionSlice";
import userAllEmailData from "./slices/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";
// import allServiceData from "./slices/getAllServiceSlice";
import notificationReducer from "./slices/notificationSlice";
import transactionReportReducer from "./slices/transactionReportSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
    // getAllService: allServiceData,
    allNotification: notificationReducer,
    transactionReport: transactionReportReducer,
  },
});
export default store;

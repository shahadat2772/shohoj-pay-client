import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./slices/transactionSlice";
import userAllEmailData from "./slices/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";
import notificationReducer from "./slices/notificationSlice";
import transactionReportReducer from "./slices/transactionReportSlice";
import moneyRequestReducer from "./slices/moneyRequestSlice";
import allAdminReducer from "./slices/allAdminSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
    allNotification: notificationReducer,
    transactionReport: transactionReportReducer,
    allRequest: moneyRequestReducer,
    allAdmin: allAdminReducer,
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./slices/transactionSlice";
import userAllEmailData from "./slices/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";
import notificationReducer from "./slices/notificationSlice";
import transactionReportReducer from "./slices/transactionReportSlice";
import moneyRequestReducer from "./slices/moneyRequestSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
    allNotification: notificationReducer,
    transactionReport: transactionReportReducer,
    allRequest: moneyRequestReducer,
  },
});
export default store;

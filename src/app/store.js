import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./slices/transactionSlice";
import userAllEmailData from "./slices/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";
import notificationReducer from "./slices/notificationSlice";
import transactionReportReducer from "./slices/transactionReportSlice";
import moneyRequestReducer from "./slices/moneyRequestSlice";
import allAdminReducer from "./slices/allAdminSlice";
import allUserReducer from "./slices/allUserSlice";
import countryCitySlice from "./slices/countryCitySlice";
import userInfoSlice from "./slices/userInfoSlice";

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
    allNotification: notificationReducer,
    transactionReport: transactionReportReducer,
    allRequest: moneyRequestReducer,
    allAdmin: allAdminReducer,
    allUser: allUserReducer,
    countryCity: countryCitySlice,
    userInfo: userInfoSlice
  },
});
export default store;

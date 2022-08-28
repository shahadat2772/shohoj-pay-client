import { configureStore } from "@reduxjs/toolkit";
import allTransactionReducer from "./slices/transactionSlice";
import userAllEmailData from "./slices/userAllEmailInfoSlice";
import signUpLoadingReducer from "./slices/signUpLoadingSlice";
<<<<<<< HEAD
=======
import allServiceData from "./features/getAllServiceSlice";
import notificationReducer from "./slices/notificationSlice";
>>>>>>> 89446ec7e9d830ad728647cae6b2fcff192701f8

const store = configureStore({
  reducer: {
    allTransaction: allTransactionReducer,
    userAllEmailData: userAllEmailData,
    signUpLoading: signUpLoadingReducer,
<<<<<<< HEAD
=======
    getAllService: allServiceData,
    allNotification: notificationReducer,
>>>>>>> 89446ec7e9d830ad728647cae6b2fcff192701f8
  },
});
export default store;

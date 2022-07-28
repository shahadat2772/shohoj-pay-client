import { userReducer } from "./userReducer";
import { combineReducers } from "redux";
import { serviceReducer } from "./serviceReducer"
export const reducers = combineReducers({
    user: userReducer,
    services: serviceReducer
});


import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    user: [{ name: "mahfuz swaron" }]
}
const registerUser = (user) => {
    return
}

export const userReducer = (state = initialState, type, payload) => {
    switch (type) {
        case ActionTypes.REGISTER_USER:


            return state

        default:
            return state;
    }
}
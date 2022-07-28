import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    user: { name: "mahfuz swaron" }
}
const setUser = (user, state) => {
    const newState = { ...state };
    newState.user = user;
    console.log(user)
    return newState;
}

export const userReducer = (state = initialState, type, payload) => {
    // switch (type) {
    //     case ActionTypes.SET_USER:
    //         return setUser(payload, state)

    //     default:
    //         return state;
    // }
    return { user: payload }
}
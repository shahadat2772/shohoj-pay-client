import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    user: {}
}

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER:
            return { ...payload }

        default:
            return state;
    }
}
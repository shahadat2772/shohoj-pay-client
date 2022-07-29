import { ActionTypes } from "../constants/actionTypes"

export const registerUser = (user) => {
    return {
        type: ActionTypes.REGISTER_USER,
        payload: user
    }
};
export const deleteUser = (user) => {
    return {
        type: ActionTypes.DELETE_USER,
        payload: user
    }
};
export const setUser = (user) => {
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
};
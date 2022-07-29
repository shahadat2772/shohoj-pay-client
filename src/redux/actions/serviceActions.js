import { ActionTypes } from "../constants/actionTypes"

export const addMoney = (info) => {
    return {
        type: ActionTypes.ADD_MONEY,
        payload: info
    }
}
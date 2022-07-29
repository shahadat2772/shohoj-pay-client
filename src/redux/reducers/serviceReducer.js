import { ActionTypes } from "../constants/actionTypes";
const initialState = {
    transcationInfo: {}
}
const addMoney = (state, info) => {
    const newState = { ...state };
    newState.transcationInfo = info;
    fetch("http://localhost:5000/addMoney", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))

    return newState;
}
export const serviceReducer = (state = initialState, type, payload) => {
    switch (type) {
        case ActionTypes.ADD_MONEY:

            return addMoney(state, payload);

        default:
            return state;
    }
}
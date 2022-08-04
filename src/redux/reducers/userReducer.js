import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    user: {}
}
// const setUserInfo = async (email, state) => {

//     const res = await fetch("http://localhost:5000/getUserInfo", {
//         method: "GET",
//         headers: {
//             email: email
//         },

//     })
//     const data = await res.json();
//     const newState = { ...state }
//     newState.user = data
//     const user = { ...data }
//     return { user }
// }

export const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER:
            console.log(payload)
            return { ...state, user: payload }

        default:
            return state;
    }
}
const initialState = {
  user: { name: "mahfuz swaron" },
};
export const userReducer = (state = initialState, type, payload) => {
  // switch (type) {
  //     case ActionTypes.SET_USER:
  //         return setUser(payload, state)

  //     default:
  //         return state;
  // }
  return { user: payload };
};

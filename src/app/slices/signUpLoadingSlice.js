import { createSlice } from "@reduxjs/toolkit";

const signUpLoadingSlice = createSlice({
  name: "signUploading",
  initialState: { signUpLoading: false },
  reducers: {
    updateSignUpLoading: (state, action) => {
      state.signUpLoading = action.payload;
    },
  },
});

export const { updateSignUpLoading } = signUpLoadingSlice.actions;
export default signUpLoadingSlice.reducer;

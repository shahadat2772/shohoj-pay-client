import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllTransaction = createAsyncThunk(
  "allTransaction/fetchAllTransaction",
  async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
    return res.data;
  }
);

const allTransactionSlice = createSlice({
  name: "allTransaction",
  initialState: {
    isLoading: false,
    allTransactionData: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTransaction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allTransactionData = action.payload;
      state.error = null;
    });

    builder.addCase(fetchAllTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.allTransactionData = [];
      state.error = action.error.message;
    });
  },
});

export default allTransactionSlice.reducer;

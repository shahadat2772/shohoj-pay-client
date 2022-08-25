import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchAllService = createAsyncThunk(
  "allService/fetchAllService",
  async (monthServiceFilter) => {
    const res = await axios.get("http://localhost:5000/all-service", {
      headers: {
        "content-type": "application/json",
        monthServiceFilter,
      },
    });
    return res.data;
  }
);

const allServiceSlice = createSlice({
  name: "allService",
  initialState: {
    isLoading: false,
    allService: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllService.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllService.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allService = action.payload;
      state.error = null;
    });

    builder.addCase(fetchAllService.rejected, (state, action) => {
      state.isLoading = false;
      state.allService = [];
      state.error = action.error.message;
    });
  },
});

export default allServiceSlice.reducer;

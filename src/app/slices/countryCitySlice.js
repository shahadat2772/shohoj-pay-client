import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCountries = createAsyncThunk(
    "countryCity/fetchCountries",
    async () => {
        const res = await axios.get(
            "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        );
        return res.data;
    }
);

const countryCitySlice = createSlice({
    name: "countryCitySlice",
    initialState: {
        isLoading: false,
        allCountries: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCountries.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCountries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCountries = action.payload;
            state.error = null;
        });

        builder.addCase(fetchCountries.rejected, (state, action) => {
            state.isLoading = false;
            state.allCountries = [];
            state.error = action.error.message;
        });
    },
});

export default countryCitySlice.reducer;

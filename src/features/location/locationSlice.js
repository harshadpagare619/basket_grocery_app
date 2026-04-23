import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: ["Mumbai", "Pune", "Delhi", "Gurgaon", "Noida", "Hyderabad", "Bangalore", "Kolkata", "Surat", "Chennai"]
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.selectedCity = action.payload;
        },
    },
});

export const {setSelectedCity} = locationSlice.actions;
export default locationSlice.reducer;

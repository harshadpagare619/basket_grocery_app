import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hideHeaderFooter: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setHideHeaderFooter: (state, action) => {
            state.hideHeaderFooter = action.payload;
        },
    },
});

export const {setHideHeaderFooter} = uiSlice.actions;
export default uiSlice.reducer;
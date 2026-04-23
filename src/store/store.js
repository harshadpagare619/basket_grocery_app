import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/cartSlice';
import searchReducer from '../features/search/searchSlice';
import uiReducer from '../features/UI/uiSlice';
import locationReducer from '../features/location/locationSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        search: searchReducer,
        ui: uiReducer,
        location: locationReducer,
    },
});
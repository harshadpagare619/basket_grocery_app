import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem('cartItems');

const initialState = {
    items: storedCart ? JSON.parse(storedCart) : []
};

const saveToLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item._id === product._id);

            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    _id: product._id,
                    name: product.name,
                    image: product.images?.[0],
                    unitPrice: product.newPrice,
                    size: product.size,
                    sizeUnit: product.sizeUnit,
                    quantity: 1
                });
            }

            saveToLocalStorage(state.items);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item._id === action.payload);

            if(item) item.quantity += 1;

            saveToLocalStorage(state.items);
        },
        decreaseQuantity: (state, action) => {
            const index = state.items.findIndex(item => item._id === action.payload);

            if(index !== -1) {
                if(state.items[index].quantity > 1) {
                    state.items[index].quantity -= 1;
                } else {
                    state.items.splice(index, 1);
                }
            }

            saveToLocalStorage(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);

            saveToLocalStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [],

            localStorage.removeItem('cartItems');
        }
    }
});

export const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
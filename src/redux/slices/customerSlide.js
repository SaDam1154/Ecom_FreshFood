import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        login: (state, action) => {
            return action.payload;
        },
        logout: () => null,
        update: (state, action) => {
            return action.payload;
        },
        addToFavorites: (state, action) => {
            const productId = action.payload;
            state.listFavorite.push(productId);
        },
        removeFromFavorites: (state, action) => {
            const productId = action.payload;
            state.listFavorite = state.listFavorite.filter((id) => id !== productId);
        },
    },
});

// Action creators are generated for each case reducer function
const customerReducer = customerSlice.reducer;
const customerActions = customerSlice.actions;

export default customerReducer;
export { customerActions };

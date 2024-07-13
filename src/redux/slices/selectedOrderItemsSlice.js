import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productIds: [],
};

export const selectedOrderItemsSlice = createSlice({
    name: 'selectedOrderItems',
    initialState,
    reducers: {
        // payload: id
        toggle: (state, action) => {
            const index = state.productIds.indexOf(action.payload);
            if (index === -1) {
                state.productIds.push(action.payload);
            } else {
                state.productIds.splice(index, 1);
            }
        },
        // payload: ids
        addAll: (state, action) => {
            state.productIds = action.payload;
        },
        reset: () => initialState,
    },
});

// Action creators are generated for each case reducer function
const selectedOrderItemsReducer = selectedOrderItemsSlice.reducer;
const selectedOrderItemsActions = selectedOrderItemsSlice.actions;

export default selectedOrderItemsReducer;
export { selectedOrderItemsActions };

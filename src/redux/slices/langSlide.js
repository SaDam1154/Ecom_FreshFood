import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 2 };

export const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        vi: (state, action) => {
            state.value = 'Vi';
        },
        en: (state, action) => {
            state.value = 'En';
        },
    },
});

// Action creators are generated for each case reducer function
const langReducer = langSlice.reducer;
const langActions = langSlice.actions;

export default langReducer;
export { langActions };

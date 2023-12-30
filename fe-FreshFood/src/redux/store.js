import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import customerReducer from './slices/customerSlide';

const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    // Save to localStorage
    const state = store.getState();
    localStorage.setItem('thuc-pham-sach-customer', JSON.stringify(state.customer));

    return result;
};

const reHydrateStore = () => {
    if (localStorage.getItem('thuc-pham-sach-customer') !== null) {
        return {
            order: {
                customer: {
                    name: '',
                    phone: '',
                    address: '',
                },
                details: [],
                totalPrice: 0,
            },
            customer: JSON.parse(localStorage.getItem('thuc-pham-sach-customer')),
        };
    } else {
        return {
            order: {
                customer: {
                    name: '',
                    phone: '',
                    address: '',
                },
                details: [],
                totalPrice: 0,
            },
            customer: null,
        };
    }
};

export const store = configureStore({
    reducer: { order: orderReducer, customer: customerReducer },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

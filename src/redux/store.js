import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './slices/orderSlice';
import customerReducer from './slices/customerSlide';
import langReducer from './slices/langSlide';
import selectedOrderItemsReducer from './slices/selectedOrderItemsSlice';

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
                intoMoney: 0,
                priceDiscounted: 0,
            },
            customer: JSON.parse(localStorage.getItem('thuc-pham-sach-customer')),
            lang: { value: 'Vi' },
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
                intoMoney: 0,
                priceDiscounted: 0,
            },
            customer: null,
            lang: { value: 'Vi' },
        };
    }
};

export const store = configureStore({
    reducer: {
        order: orderReducer,
        customer: customerReducer,
        lang: langReducer,
        selectedOrderItems: selectedOrderItemsReducer,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

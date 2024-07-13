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
    localStorage.setItem('thuc-pham-sach-order', JSON.stringify(state.order));
    localStorage.setItem('thuc-pham-sach-selected-item', JSON.stringify(state.selectedOrderItems));

    return result;
};

const reHydrateStore = () => {
    let order;
    let customer;
    let selectedOrderItems;

    if (localStorage.getItem('thuc-pham-sach-customer') !== null) {
        customer = JSON.parse(localStorage.getItem('thuc-pham-sach-customer'));
    } else {
        customer = null;
    }

    if (localStorage.getItem('thuc-pham-sach-order') !== null) {
        order = JSON.parse(localStorage.getItem('thuc-pham-sach-order'));
    } else {
        order = {
            customer: {
                name: '',
                phone: '',
                address: '',
            },
            details: [],
            totalPrice: 0,
            intoMoney: 0,
            priceDiscounted: 0,
        };
    }

    if (localStorage.getItem('thuc-pham-sach-selected-item') !== null) {
        selectedOrderItems = JSON.parse(localStorage.getItem('thuc-pham-sach-selected-item'));
    } else {
        selectedOrderItems = { productIds: [] };
    }

    return {
        order,
        customer,
        selectedOrderItems,
        lang: { value: 'Vi' },
    };
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

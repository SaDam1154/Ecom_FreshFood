// Layouts
import FullLayout from '../layouts/FullLayout';
// Pages ADMIN
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Order from '../pages/Order';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';
//PAGE CUSTOMER

// Public routes
const publicRoutes = [
    //CUSTOMER HOME
    {
        path: '/',
        component: Home,
        props: {
            heading: 'Trang chủ',
        },
    },
    {
        path: '/Login',
        layout: FullLayout,
        component: Login,
        props: {
            heading: 'Trang chủ',
        },
    },
    {
        path: '/product/:id',
        component: ProductDetail,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: 'order',
        component: Order,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

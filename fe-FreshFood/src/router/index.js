// Layouts
import FullLayout from '../layouts/FullLayout';
// Pages ADMIN
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Order from '../pages/Order';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
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
        path: '/products',
        component: Products,
        props: {
            heading: 'Trang chủ',
        },
    },
    {
        path: '/Login',
        layout: FullLayout,
        component: Login,
    },
    {
        path: '/Signup',
        layout: FullLayout,
        component: Signup,
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

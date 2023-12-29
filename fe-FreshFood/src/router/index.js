// Layouts

// Pages ADMIN
import Home from '../pages/Home';
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
        path: '/product/:id',
        component: ProductDetail,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

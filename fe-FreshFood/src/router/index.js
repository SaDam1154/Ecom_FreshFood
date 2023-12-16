// Layouts

// Pages ADMIN
import Home from '../pages/Home';
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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

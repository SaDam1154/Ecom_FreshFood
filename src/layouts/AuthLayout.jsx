import { useSelector } from 'react-redux';
import { customerSelector } from '../redux/selectors';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function AuthLayout({ children }) {
    const location = useLocation();
    const customer = useSelector(customerSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (customer === null) {
            navigate('/login');
        }
    }, [customer, location.pathname]);
    return <>{children}</>;
}

export default AuthLayout;

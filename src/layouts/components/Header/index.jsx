import { Link } from 'react-router-dom';
import Search from '../../../components/SearchInput';
import { customerSelector } from '../../../redux/selectors';
import { customerActions } from '../../../redux/slices/customerSlide';
import { useDispatch, useSelector } from 'react-redux';
function Header() {
    const dispatch = useDispatch();
    const customer = useSelector(customerSelector);
    const showLogoutNoti = () => toast.info('Đã đăng xuất!');
    return (
        <div className="flex top-0 shadow-lg bg-white z-50 shadow-slate-100 select-none">
            {/* Logo */}

            <div className="flex w-full px-8 sm:px-12 lg:px-20 xl:px-28 py-4 justify-between items-center px2">
                <Link to={'/'}>
                    <img className="w-20 h-20 cursor-pointer" src="/mainLogo.png" alt="Logo thực phẩm sạch" />
                </Link>
                <Search></Search>
                {customer ? (
                    <div className="flex [&>*:not(:last-child)]:border-r-2">
                        <Link to="/cart" className="px-4 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </Link>
                        {/* User */}
                        <Link to="/profile" className="px-4 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </Link>

                        <div className="px-4 ">
                            <svg
                                onClick={() => dispatch(customerActions.logout())}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                />
                            </svg>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex [&>*:not(:last-child)]:border-r-2
                    "
                    >
                        {/* cart */}
                        <Link to="/cart" className="px-4 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                />
                            </svg>
                        </Link>

                        <Link to={'/signup'} className="px-4 ">
                            <button className="btn btn-sm btn-border-blue">
                                <span>Sign Up</span>
                            </button>
                        </Link>
                        <Link to={'/login'} className="px-4 ">
                            <button className="btn btn-sm btn-blue">
                                <span>Log In</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
